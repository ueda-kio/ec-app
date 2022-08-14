// Storeで管理しているstateを参照する担当大臣

import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

// stateからuserIdだけ取得する関数
// コンポーネント側で使用
export const getUserId = createSelector(
    [usersSelector],
    (state) => state.uid
);

// stateからuserIdだけ取得する関数
export const getUserName = createSelector(
    [usersSelector],
    (state) => state.username
);

// stateからisSignedInだけ取得する関数
export const getSignedIn = createSelector(
    [usersSelector],
    (state) => state.isSignedIn
);