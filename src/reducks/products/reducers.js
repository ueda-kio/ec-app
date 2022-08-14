// StoreのStateの変更を管理
import initialState from '../store/initialState';

export const ProductsReducer = (state = initialState.products, action) => {
  switch(action.type) {
      default:
        return state
  }
}