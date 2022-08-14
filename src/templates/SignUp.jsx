import React from 'react'
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PrimaryButton, TextInput } from '../components/UIkit/';
import { signUp } from '../reducks/users/operations';

const SignUp = () => {
    const dispatch = useDispatch();

    // ローカルステイト
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // onChangeイベントに登録する関数をメモ化する
    const inputUsername = useCallback((e) => {
        setUserName(e.target.value);
    }, [setUserName]);
    const inputEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, [setEmail]);
    const inputPassword = useCallback((e) => {
        setPassword(e.target.value);
    }, [setPassword]);
    const inputConfirmPassword = useCallback((e) => {
        setConfirmPassword(e.target.value);
    }, [setConfirmPassword]);

    return (
        <div className='c-section-container'>
            <h2 className='u-text__headline u-text-center'>アカウント登録</h2>
            <div className='module-spacer--medium'></div>
            <TextInput
                fullWidth={true} label={'ユーザー名'} multiline={false} required={true} rows={1} value={username} type={'text'} onChange={inputUsername}
            />
            <TextInput
                fullWidth={true} label={'メールアドレス'} multiline={false} required={true} rows={1} value={email} type={'email'} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={'パスワード'} multiline={false} required={true} rows={1} value={password} type={'password'} onChange={inputPassword}
            />
            <TextInput
                fullWidth={true} label={'確認用パスワード'} multiline={false} required={true} rows={1} value={confirmPassword} type={'password'} onChange={inputConfirmPassword}
            />
            <div className='module-spacer--medium'></div>
            <div className='center'>
                <PrimaryButton
                    label={'アカウントを登録する'}
                    onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
                />
            </div>
        </div>
    );
};

export default SignUp;
