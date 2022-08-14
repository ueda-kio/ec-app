import { createStore as reduxCreateStore, combineReducers } from 'redux';
// import { ProductsReducer } from '../product/reducers'
import { UserReducer } from '../users/reducers';

/**
 * @example
 * ```
 * // stateのデータ構造のオブジェクトを連結したものをreturnする
 * {
 *   products: {},
 *   users: {
 *     isSignedIn: false,
 *     uid: '',
 *     username: ''
 *   }
 * }
 * ```
 * @returns {object}
 */
const createStore = () => {
  return reduxCreateStore(

    // 分割したreducerたちをまとめるヤツ
    combineReducers({
      // products: ProductsReducer,
      users: UserReducer
    })
  )
}

export default createStore;