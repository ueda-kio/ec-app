// Storeで管理しているstateを参照する担当大臣

import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

// stateからuserIdだけ取得する関数
// コンポーネント側で使用
export const getUserId = createSelector(
    [usersSelector],
    (state) => state.uid // users.uidを返すという意味
);

// stateからuserIdだけ取得する関数
export const getUserName = createSelector(
    [usersSelector],
    (state) => state.username // users.uidを返すという意味
);