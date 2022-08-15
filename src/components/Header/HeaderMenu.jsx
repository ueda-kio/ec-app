import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Badge } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';
// import { fetchProductsInCart } from '../../reducks/users/operations';
import { getProductsInCart, getUserId } from '../../reducks/users/selectors';
import { db } from '../../firebase/index';

const HeaderMenu = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const userId = getUserId(selector);
    // let productsInCart = getProductsInCart(selector);

    // Listen products in user's cart
    // useEffect(() => {
    //     const unsubscribe = db.collection('users').doc(userId).collection('cart')
    //         .onSnapshot(snapshots => {

    //             snapshots.docChanges().forEach(change => {
    //                 const product = change.doc.data();
    //                 const changeType = change.type

    //                 switch (changeType) {
    //                     case 'added':
    //                         productsInCart.push(product);
    //                         break;
    //                     case 'modified':
    //                         const index = productsInCart.findIndex(product => product.cartId === change.doc.id)
    //                         productsInCart[index] = product;
    //                         break;
    //                     case 'removed':
    //                         productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id);
    //                         break;
    //                     default:
    //                         break;
    //                 }
    //             });

    //             dispatch(fetchProductsInCart(productsInCart));
    //         });

    //     return () => unsubscribe();
    // },[]);

    return (
        <>
            <IconButton onClick={() => dispatch(push('/cart'))}>
                <Badge badgeContent={3} color='secondary'>
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <IconButton>
                <FavoriteBorderIcon />
            </IconButton>
            <IconButton
                aria-label='Menu Items'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                // onClick={(e) => props.handleDrawerToggle(e, true)}
                color='inherit'
            >
                <MenuIcon />
            </IconButton>
        </>
    );
};

export default HeaderMenu;