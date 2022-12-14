import React from 'react'
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { PrimaryButton, TextInput } from '../components/UIkit';
import { signIn } from '../reducks/users/operations';

const SignIn = () => {
    const dispatch = useDispatch();

    // ローカルステイト
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // onChangeイベントに登録する関数をメモ化する
    const inputEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, [setEmail]);
    const inputPassword = useCallback((e) => {
        setPassword(e.target.value);
    }, [setPassword]);

    return (
        <div className='c-section-container'>
            <h2 className='u-text__headline u-text-center'>サインイン</h2>
            <div className='module-spacer--medium'></div>
            <TextInput
                fullWidth={true} label={'メールアドレス'} multiline={false} required={true} rows={1} value={email} type={'email'} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={'パスワード'} multiline={false} required={true} rows={1} value={password} type={'password'} onChange={inputPassword}
            />
            <div className='module-spacer--medium'></div>
            <div className='center'>
                <PrimaryButton
                    label={'Sign In'}
                    onClick={() => dispatch(signIn(email, password))}
                />
                <div className='module-spacer--medium'></div>
                <p onClick={() => dispatch(push('/signup'))}>アカウントをお持ちで無い方はこちら</p>
                <p onClick={() => dispatch(push('/signin/reset'))}>パスワードを忘れた方はこちら</p>
            </div>
        </div>
    );
};

export default SignIn;
