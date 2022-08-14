import React, { useCallback, useEffect, useState } from 'react';
import { TextInput } from '../UIkit';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    checkIcon: {
        float: 'right'
    },
    iconCell: {
        padding: 0,
        height: 48,
        width: 48
    }
});

const SetSizesArea = (props) => {
    const classes = useStyles();

    const [index, setIndex] = useState(0);
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(0);

    const inputSize = useCallback((event) => {
        setSize(event.target.value);
    }, [setSize]);

    const inputQuantity = useCallback((event) => {
        setQuantity(event.target.value);
    }, [setQuantity]);

    const addSize = (index, size, quantity) => {
        if (size === '' || quantity === 0) return;

        if (index === props.sizes.length) { // 新しいサイズの場合
            props.setSizes((prevState) => [...prevState, { size, quantity }]);

            setIndex(index + 1);
            setSize('');
            setQuantity(0)
        } else { // 既存サイズの編集の場合
            const newSizes = props.sizes;
            newSizes[index] = { size, quantity };
            props.setSizes(newSizes); // まるっと新しい値に変更する

            setIndex(newSizes.length);
            setSize('');
            setQuantity(0);
        }
    };

    const editSize = (index, size, quantity) => {
        setIndex(index);
        setSize(size);
        setQuantity(quantity);
    };

    const deleteSize = (deleteIndex) => {
        // `deleteIndex`を削除するのではなく、それ以外のもので上書きする
        const newSizes = props.sizes.filter((_, i) => i !== deleteIndex);
        props.setSizes(newSizes);
    };

    // 編集画面の場合`props.sizes`が存在するのでstateに反映させる
    useEffect(() => {
        setIndex(props.sizes.length);
    }, [props.sizes.length]);

    return (
        <div aria-label='サイズ展開'>
            <TableContainer component={Paper}>
                <Table aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>サイズ</TableCell>
                            <TableCell>数量</TableCell>
                            <TableCell className={classes.iconCell} />
                            <TableCell className={classes.iconCell} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.sizes.length > 0 && (
                            props.sizes.map((item, i) => (
                                <TableRow key={item.size}>
                                    <TableCell component='th' scope='row'>{item.size}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell} onClick={() => editSize(i, item.size, item.quantity)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell} onClick={() => deleteSize(i)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <div>
                    <TextInput
                        fullWidth={false} label={'サイズ'} multiline={false} required={true}
                        onChange={inputSize} rows={1} value={size} type={'text'}
                    />
                    <TextInput
                        fullWidth={false} label={'数量'} multiline={false} required={true}
                        onChange={inputQuantity} rows={1} value={quantity} type={'number'}
                    />
                </div>
                <IconButton className={classes.checkIcon} onClick={() => addSize(index, size, quantity)}>
                    <CheckCircleIcon/>
                </IconButton>
            </TableContainer>
            <div className='module-spacer--small'/>
        </div>
    );
};

export default SetSizesArea;