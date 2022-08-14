import React from 'react';
import { useSelector } from 'react-redux';
import { getUserId } from '../reducks/users/selectors';

const Home = () => {
    // `useSelector`HooksでRedux全体のstoreをselectorに格納
    const selector = useSelector(state => state);
    const uid = getUserId(selector);

    return (
        <>
            <h2>Home</h2>
            <p>uid: {uid}</p>
        </>
    );
};

export default Home;
