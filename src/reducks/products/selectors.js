// Storeで管理しているstateを参照する担当大臣

import { createSelector } from 'reselect';

const productsSelector = (state) => state.products;

export const getProducts = createSelector(
    [productsSelector],
    state => state.list
);