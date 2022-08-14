import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { storage } from "../../firebase/index"
import { IconButton, makeStyles } from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { ImagePreview } from './index';

const useStyles = makeStyles({
    icon: {
        height: 48,
        width: 48
    }
})

const ImageArea = (props) => {
    const classes = useStyles();

    /**
     * プレビューから画像を削除する処理
     */
    const deleteImage = useCallback(async (id) => {
        const ret = window.confirm('この画像を削除しますか？');
        if (!ret) {
            return false;
        } else {
            const newImages = props.images.filter(image => image.id !== id);
            props.setImages(newImages);
            return storage.ref('images').child(id).delete();
        }
    }, [props.images]);

    const uploadImage = useCallback((e) => {
        // dispatch(showLoadingAction('uploading...'))
        const file = e.target.files;
        let blob = new Blob(file, { type: 'image/jpeg' }); // fileを直接firebaseにアップできない

        // 16桁のランダムな数値を生成
        // cloud storageにアップするファイル名の競合を回避する目的
        const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const N = 16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

        // cloud storage上の`images`ディレクトリに`fileName`という名前でアップ
        const uploadRef = storage.ref('images').child(fileName);
        const uploadTask = uploadRef.put(blob);

        uploadTask.then(() => {
            // アップ後、ダウンロード可能なURLを取得
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = {id: fileName, path: downloadURL};

                // 更新前のstate(画像)を使用する方法
                //! 配列やオブジェクトのstateを更新するときはこうやる
                props.setImages((prevState => [...prevState, newImage]));
                // dispatch(hideLoadingAction());
            });
        }).catch(() => {
            // dispatch(hideLoadingAction());
        });
    }, [props.setImages])

    return (
        <div>
            <div className='p-grid__list-images'>
                {props.images.length > 0 && (
                    props.images.map((image) => <ImagePreview delete={deleteImage} id={image.id} path={image.path} key={image.id} /> )
                )}
            </div>
            <div className='u-text-right'>
                <span>商品画像を登録する</span>
                <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input className='u-display-none' type='file' id='image' onChange={e => uploadImage(e)} />
                    </label>
                </IconButton>
            </div>
        </div>
    );
};

export default ImageArea;
