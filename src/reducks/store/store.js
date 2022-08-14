import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
// import { ProductsReducer } from '../product/reducers'
import { UsersReducer } from '../users/reducers';

/**
 * reducerをまとめる
 * @param {any} history ルーティング時の情報（refererなど）
 */
const createStore = (history) => {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history), // historyの情報をstoreに`router`という名前で渡す
      users: UsersReducer,
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk // thunkモジュールを`applyMiddleware`の引数に直接渡す
    )
  )
}

export default createStore;