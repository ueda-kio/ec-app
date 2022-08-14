import React from 'react';
import CloseIcon from '@material-ui/icons//Close';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 30,
        height: 30,
        color: '#fff',
        zIndex: 10,
        opacity: 0,
        transition: 'opacity 0.3s',
    }
})

const ImagePreview = (props) => {
    const classes = useStyles();

    return (
        <div className="p-media__thumb" onClick={() => props.delete(props.id)}>
            <CloseIcon className={classes.closeButton} />
            <img alt="アイキャッチ画像" src={props.path} />
        </div>
    );
};

export default ImagePreview;