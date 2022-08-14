import React, { useState } from 'react'
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { PrimaryButton, TextInput, SelectBox } from '../components/UIkit';
import { saveProducts } from '../reducks/products/operations';

const ProductEdit = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [gender, setGender] = useState('');
    const [price, setPrice] = useState('');

    const genders = [
        {id: 'all', name: 'すべて'},
        {id: 'male', name: 'メンズ'},
        {id: 'female', name: 'レディース'}
    ];

    const categories = [
        { id: 'tops', name: 'トップス' },
        { id: 'shirts', name: 'シャツ' },
        { id: 'pants', name: 'パンツ' },
    ]

    const inputName = useCallback((e) => {
        setName(e.target.value);
    }, [setName]);

    const inputDescription = useCallback((e) => {
        setDescription(e.target.value);
    }, [setDescription]);

    const inputPrice = useCallback((e) => {
        setPrice(e.target.value);
    }, [setPrice]);

    return (
        <section>
            <h2 className='u-text__headline u-text-center'>商品の登録・編集</h2>
            <div className='c-section-container'>
                <TextInput
                    fullWidth={true} label={'商品名'} multiline={false} required={true} rows={1} value={name} type={'text'} onChange={inputName}
                />
                <TextInput
                    fullWidth={true} label={'商品説明'} multiline={true} required={true} rows={5} value={description} type={'text'} onChange={inputDescription}
                />
                <SelectBox
                    label={'カテゴリー'} options={categories} required={true} select={setCategory} value={category}
                />
                <SelectBox
                    label={'性別'} options={genders} required={true} select={setGender} value={gender}
                />
                <TextInput
                    fullWidth={true} label={'価格'} multiline={false} required={true} rows={1} value={price} type={'number'} onChange={inputPrice}
                />
                <div className='module-spacer--medium'></div>
                <div className='center'>
                    <PrimaryButton
                        label={'商品情報を保存'}
                        onClick={() => dispatch(saveProducts(name, description, category, gender, price))}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProductEdit;
