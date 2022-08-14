import React from 'react'
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { PrimaryButton, TextInput } from '../components/UIkit';
import { resetPassword } from '../reducks/users/operations';

const Reset = () => {
    const dispatch = useDispatch();

    // ローカルステイト
    const [email, setEmail] = useState('');

    // onChangeイベントに登録する関数をメモ化する
    const inputEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, [setEmail]);

    return (
        <div className='c-section-container'>
            <h2 className='u-text__headline u-text-center'>パスワードをリセット</h2>
            <div className='module-spacer--medium'></div>
            <TextInput
                fullWidth={true} label={'メールアドレス'} multiline={false} required={true} rows={1} value={email} type={'email'} onChange={inputEmail}
            />
            <div className='module-spacer--medium'></div>
            <div className='center'>
                <PrimaryButton
                    label={'Reset Password'}
                    onClick={() => dispatch(resetPassword(email))}
                />
                <div className='module-spacer--medium'></div>
                <p onClick={() => dispatch(push('/signin'))}>ログイン画面に戻る</p>
            </div>
        </div>
    );
};

export default Reset;
