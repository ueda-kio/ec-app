// StoreのStateの変更を管理
import * as Actions from './action';
import initialState from '../store/initialState';

export const ProductsReducer = (state = initialState.products, action) => {
  switch(action.type) {
      default:
        return state
  }
}