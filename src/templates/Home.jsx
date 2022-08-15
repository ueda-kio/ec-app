import React from 'react';
import { useSelector } from 'react-redux';
import { getUserId, getUserName } from '../reducks/users/selectors';
import { signOut } from '../reducks/users/operations';
import { useDispatch } from 'react-redux';

const Home = () => {
    // `useSelector`HooksでRedux全体のstoreをselectorに格納
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const uid = getUserId(selector);
    const userName = getUserName(selector);

    return (
        <>
            <h2>Home</h2>
            <p>uid: {uid}</p>
            <p>UerName: {userName}</p>
            <button onClick={() => dispatch(signOut())}>サインアウト</button>
        </>
    );
};

export default Home;
