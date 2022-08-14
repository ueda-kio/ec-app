import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { listenAuthState } from './reducks/users/operations';
import { getSignedIn } from './reducks/users/selectors';

const Auth = ({ children }) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSingedIn = getSignedIn(selector);

    // mount時に１回だけログイン済みかどうかを確認する
    useEffect(() => {
        if (!isSingedIn) {
            dispatch(listenAuthState());
        }
    }, []);

    if (!isSingedIn) {
        return <></>
    } else {
        return children;
    }

};

export default Auth
