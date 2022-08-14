import { push } from 'connected-react-router';
import { auth, db, FirebaseTimestamp } from '../../firebase/index';
import { signInAction, signOutAction } from './action';

const productsRef = db.collection('products');

/**
 * 商品情報をデータベースにセットする
 * @param {string} name 商品名
 * @param {string} description 商品説明
 * @param {string} category カテゴリ
 * @param {string} gender 性別
 * @param {number} price 価格
 */
export const saveProducts = (name, description, category, gender, price, images) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now();

        const data = {
            name,
            description,
            category,
            gender,
            price: parseInt(price, 10),
            images,
        };

        const ref = productsRef.doc();
        const id = ref.id; // firebaseが自動で採番してくれた値を格納
        data.id = id; // dataの中に入れておく
        data.created_at = timestamp;

        // firebaseのデータベースへ値をセット
        return productsRef.doc(id).set(data)
            .then(() => {
                dispatch(push('/'));
            })
            .catch((e) => {
                throw new Error(e)
            });
    }
};
