// StoreのStateの変更を管理
import * as Actions from './action';
import initialState from '../store/initialState';

export const UsersReducer = (state = initialState.users, action) => {
  switch(action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload // stateの値をpayloadで上書きする
      };

    case Actions.SIGN_OUT:
      return {
        ...action.payload // initialStateに戻す
      };

      default:
        return state
  }
}