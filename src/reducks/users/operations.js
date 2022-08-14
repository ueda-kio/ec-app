import { push } from 'connected-react-router';
import { signInAction } from './action';

export const signIn = () => {
    return async (dispatch, getState) => {
        const state = getState();
        const isSignedIn = state.users.isSignedIn;

        if (!isSignedIn) {
            const url = 'https://jsonplaceholder.typicode.com/posts/1';
            const res = await fetch(url).then(res => res.json());
            const username = res.title;
            const userId = res.id;

            dispatch(signInAction({
                isSignedIn: true,
                uid: userId,
                username: username
            }));
            dispatch(push('/')); // ホームに遷移
        }
    };
};
