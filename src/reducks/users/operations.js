import { push } from 'connected-react-router';
import { auth, db, FirebaseTimestamp } from '../../firebase/index';
import { signInAction, signOutAction } from './action';

/**
 * ユーザーのログイン状態を監視。
 * - 未ログインならサインイン画面へ遷移
 * - ログイン済みなら`signInAction`を実行しtopへ遷移
 */
export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged((user) => {
            console.log('user', user);
            if (user) { // 認証済み
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
                    });
            } else { // 未認証
                dispatch(push('/signin'));
            }
        });
    }
};

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

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(signOutAction());
                dispatch(push('/signin'));
            })
    };
};

export const resetPassword = (email) => {
    return async (dispatch) => {
        if (email === '') {
            alert('必須項目です');
            return false;
        } else {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('入力されたアドレスにメール送ったよ！')
                    dispatch(push('/signin'));
                })
                .catch(() => {
                    alert('パスワードリセットに失敗しました');
                })
        }
    };
};