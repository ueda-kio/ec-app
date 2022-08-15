import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import { getOrdersHistory } from '../reducks/users/selectors';
import { OrderHistoryItem } from '../components/Products';
import { fetchOrdersHistory } from '../reducks/users/operations';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    orderList: {
        background: theme.palette.grey['100'],
        margin: '0 auto',
        padding: 32,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        [theme.breakpoints.up('md')]: {
            width: 768
        }
    },
}))

const OrderHistory = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const orders = getOrdersHistory(selector);

    // 初期状態はinitialStateなのでfetchでOrdersHistoryをとってくる
    useEffect(() => {
        dispatch(fetchOrdersHistory())
    },[])

    return (
        <section className='c-section-wrapin'>
            <List className={classes.orderList}>
                {orders.length > 0 && (
                    orders.map((order, i) => (
                        <React.Fragment key={i}>
                            <OrderHistoryItem order={order} key={order.id} />
                        </React.Fragment>
                    ))
                )}
            </List>
        </section>
    );
};

export default OrderHistory;