import React, { useState } from 'react'
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SetSizesArea } from '../components/Products';
import ImageArea from '../components/Products/ImageArea';
import { PrimaryButton, TextInput, SelectBox } from '../components/UIkit';
import { db } from '../firebase';
import { saveProducts } from '../reducks/products/operations';

const ProductEdit = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [gender, setGender] = useState('');
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState('');
    const [sizes, setSizes] = useState([]);

    const genders = [
        {id: 'all', name: 'すべて'},
        {id: 'male', name: 'メンズ'},
        {id: 'female', name: 'レディース'}
    ];

    // const categories = [
    //     { id: 'tops', name: 'トップス' },
    //     { id: 'shirts', name: 'シャツ' },
    //     { id: 'pants', name: 'パンツ' },
    // ];

    const inputName = useCallback((e) => {
        setName(e.target.value);
    }, [setName]);

    const inputDescription = useCallback((e) => {
        setDescription(e.target.value);
    }, [setDescription]);

    const inputPrice = useCallback((e) => {
        setPrice(e.target.value);
    }, [setPrice]);

    // URLから商品IDを取得（編集画面のみURLにIDが含まれている）
    const id = (() => {
        const endOfPath = window.location.pathname.split('/product/edit')[1];
        if (endOfPath === '') return '';
        return endOfPath.slice(1);
    })();

    // 編集画面の場合データベースから商品情報を取得しstateに反映させる（反映させるだけで自動でinputのvalueに挿入される）
    useEffect(() => {
        if (id === '') return;

        db.collection('products').doc(id).get()
            .then((snapshot) => {
                // データベースから商品情報を取得
                const data = snapshot.data();
                // ローカルstateに格納
                setImages(data.images);
                setName(data.name);
                setDescription(data.description);
                setCategory(data.category);
                setGender(data.gender);
                setPrice(data.price);
                setSizes(data.sizes);
            });
    }, [id]);

    useEffect(() => {
        db.collection('categories')
            .orderBy('order') // orderフィールドの値でソート
            .get()
            .then((snapshots) => {
                const list = [];
                snapshots.forEach((snapshot) => {
                    const data = snapshot.data();
                    list.push({
                        id: data.id,
                        name: data.name
                    });
                });
                setCategories(list);
            })
    }, [])

    return (
        <section>
            <h2 className='u-text__headline u-text-center'>商品の登録・編集</h2>
            <div className='c-section-container'>
                <ImageArea images={images} setImages={setImages} />
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
                <SetSizesArea sizes={sizes} setSizes={setSizes} />
                <div className='module-spacer--medium'></div>
                <div className='center'>
                    <PrimaryButton
                        label={'商品情報を保存'}
                        onClick={() => dispatch(saveProducts(
                            id,
                            name,
                            description,
                            category,
                            gender,
                            price,
                            images,
                            sizes
                        ))}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProductEdit;
