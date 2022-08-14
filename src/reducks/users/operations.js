import { push } from 'connected-react-router';
import { auth, db, FirebaseTimestamp } from '../../firebase/index';
import { signInAction } from './action';

export const signIn = (email, password) => {
    return async (dispatch) => {
        // validation
        if (email === '' || password === '') {
            alert('必須項目が未入力です');
            return false;
        }

        // valid
        return auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                const user = result.user;
                // 認証成功なら`user`がある
                if (!user) return;

                const uid = user.uid;

                // firebaseのデータベースから取得する
                db.collection('users').doc(uid).get()
                    .then((snapshot) => {
                        const data = snapshot.data();

                        // signInActionを実行
                        dispatch(signInAction({
                            isSignedIn: true,
                            role: data.role,
                            uid: uid,
                            username: data.username
                        }));

                        dispatch(push('/'));
                    })
            })
    };
}


export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        // validation
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            alert('必須項目が未入力です');
            return false;
        }

        if (password !== confirmPassword) {
            alert('パスワードが一致してません');
            return false;
        }

        // valid
        return auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                const user = result.user;
                // 認証成功なら`user`がある
                if (!user) return;

                const uid = user.uid;
                const timestamp = FirebaseTimestamp.now();

                // ユーザー用のデータ
                const userInitialData = {
                    created_at: timestamp,
                    email: email,
                    role: 'customer',
                    uid: uid,
                    updated_at: timestamp,
                    username: username
                }

                // firebaseのデータベースに登録する
                db.collection('users').doc(uid).set(userInitialData)
                    .then(() => {
                        dispatch(push('/')) // 登録後topへ遷移
                    })
            })
    };
}