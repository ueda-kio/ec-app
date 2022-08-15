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

export const deleteProduct = (productId) => {
    // `getState()`で現在のstoreのstateを参照できる
    return async (dispatch, getState) => {
        productsRef.doc(productId).delete()
            .then(() => {
                const prevProducts = getState().products.list;
                const nextProducts = prevProducts.filter(product => product.id !== productId);
                dispatch(deleteProductAction(nextProducts));
            })
    }
};

/**
 * 商品情報をデータベースにセットする
 * @param {string} productId 商品ID
 * @param {string} name 商品名
 * @param {string} description 商品説明
 * @param {string} category カテゴリ
 * @param {string} gender 性別
 * @param {number} price 価格
 * @param {Array} sizes 商品サイズ
 */
export const saveProducts = (productId, name, description, category, gender, price, images, sizes) => {
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

        //TODO `productId`を参照してもいいかも
        let id = '';
        // 商品の新規登録の場合（URLに商品情報が含まれていない場合）
        if (productId === '') {
            const ref = productsRef.doc();
            id = ref.id; // firebaseが自動で採番してくれた値を格納
            data.id = id; // dataの中に入れておく
            data.created_at = timestamp;
        }

        // firebaseのデータベースへ値をセット（`merge: true`とすると商品情報の更新に対応可）
        return productsRef.doc(id).set(data, { merge: true })
            .then(() => {
                dispatch(push('/'));
            })
            .catch((e) => {
                throw new Error(e)
            });
    }
};
