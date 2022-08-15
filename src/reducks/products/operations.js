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
        return productsRef.doc(id).set(data, { merge: true })
            .then(() => {
                dispatch(push('/'));
            })
            .catch((e) => {
                throw new Error(e)
            });
    }
};
