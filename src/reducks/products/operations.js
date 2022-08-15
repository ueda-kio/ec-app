import { push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase/index';
import { deleteProductAction, fetchProductsAction } from './action';

const productsRef = db.collection('products');

export const fetchProducts = () => {
    return async (dispatch) => {
        productsRef.orderBy('updated_at', 'desc').get()
            .then((snapshots) => {
                const productList = [];
                snapshots.forEach((snapshot) => {
                    const product = snapshot.data();
                    productList.push(product);
                });
                dispatch(fetchProductsAction(productList));
            })
    }
};

export const orderProduct = (productsInCart, amount) => {
    return async (dispatch, getState) => {
        // dispatch(showLoadingAction("決済処理中..."));

        const uid = getState().users.uid;
        const userRef = db.collection('users').doc(uid);
        const timestamp = FirebaseTimestamp.now();
        const products = [];
        const soldOutProducts = [];

        // 1つ以上のドキュメントに'書き込み'を行う（読み込みはしない）。処理が失敗するとロールバック
        const batch = db.batch();

        for (const product of productsInCart) {
            const snapshot = await productsRef.doc(product.productId).get();
            const sizes = snapshot.data().sizes; // 在庫状況

            const updateSizes = sizes.map(size => {
                if (size.size === product.size) {
                    if (size.quantity === 0) { // カート内の商品が在庫切れの場合
                        soldOutProducts.push(product.name);
                        return size;
                    }

                    return {
                        size: size.size,
                        quantity: size.quantity - 1
                    }
                }

                return size;
            });

            products.push({
                id: product.productId,
                images: product.images,
                name: product.name,
                price: product.price,
                size: product.size
            });

            batch.update(productsRef.doc(product.productId), {
                sizes: updateSizes // 1減った商品サイズ
            });
            batch.delete(userRef.collection('cart').doc(product.cartId));
        }

        if (soldOutProducts.length > 0) { // １つでも在庫切れの商品があった場合決済処理を止める
            const errorMessage = (soldOutProducts.length > 1)
                ? soldOutProducts.join('と')
                : soldOutProducts[0];
            alert('大変申し訳ありません。' + errorMessage + 'が在庫切れとなったため注文処理を中断しました。');
            return false;
        } else {
            // 注文履歴データを作成（`.doc()`で新しいコレクションを作成）
            const orderRef = userRef.collection('orders').doc();
            const date = timestamp.toDate();
            const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3))); // 配送日を3日後に設定

            const history = {
                amount,
                created_at: timestamp,
                id: orderRef.id,
                products,
                shipping_date: shippingDate,
                updated_at: timestamp
            };

            // DBを更新
            return batch.commit()
                .then(() => {
                    orderRef.set(history);
                    // dispatch(hideLoadingAction());
                    dispatch(push('/order/complete'));
                })
                .catch(() => {
                    // dispatch(hideLoadingAction());
                    alert('注文処理に失敗しました。通信環境をご確認のうえ、もう一度お試しください。')
                });
        }
    }
}

export const deleteProduct = (id) => {
    // `getState()`で現在のstoreのstateを参照できる
    return async (dispatch, getState) => {
        productsRef.doc(id).delete()
            .then(() => {
                const prevProducts = getState().products.list;
                const nextProducts = prevProducts.filter(product => product.id !== id);
                dispatch(deleteProductAction(nextProducts));
            })
    }
};

/**
 * 商品情報をデータベースにセットする
 * @param {string | ''} id 商品ID（編集画面の場合存在する）
 * @param {string} name 商品名
 * @param {string} description 商品説明
 * @param {string} category カテゴリ
 * @param {string} gender 性別
 * @param {number} price 価格
 * @param {Array} sizes 商品サイズ
 */
export const saveProducts = (id, name, description, category, gender, price, images, sizes) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now();

        const data = {
            name,
            description,
            category,
            gender,
            price: parseInt(price, 10),
            images,
            sizes,
            updated_at: timestamp
        };

        if (id === '') {
            const ref = productsRef.doc()
            data.created_at = timestamp;
            id = ref.id;
            data.id = id;
        }

        // firebaseのデータベースへ値をセット（`merge: true`とすると商品情報の更新に対応可）
        return productsRef.doc(id).set(data, {
                merge: true
            })
            .then(() => {
                dispatch(push('/'));
            })
            .catch((e) => {
                throw new Error(e)
            });
    }
};