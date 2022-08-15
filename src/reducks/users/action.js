//! Actionsは「プレーンなオブジェクトを返す」
// 純粋にデータだけを記述するため

export const SIGN_IN = 'SIGN_IN'; // reducersにActionのタグを渡す
export const signInAction = (userState) => { // user情報を引数に受け取る
  return {
    type: 'SIGN_IN',
    payload: {
      isSignedIn: true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username
    }
  }
};

export const SIGN_OUT = 'SIGN_OUT';
export const signOutAction = () => { // user情報を空にすれば良い
  return {
    type: 'SIGN_OUT',
    payload: {
      cart: [],
      isSignedIn: false,
      role: '',
      uid: '',
      username: 'Guest'
    }
  }
};

export const FETCH_PRODUCTS_IN_CART = 'FETCH_PRODUCTS_IN_CART';
export const fetchProductsInCartAction = (products) => {
  return {
    type: 'FETCH_PRODUCTS_IN_CART',
    payload: products
  }
};

export const FETCH_ORDERS_HISTORY = 'FETCH_ORDERS_HISTORY';
export const fetchOrdersHistoryAction = (orders) => {
    return {
        type: 'FETCH_ORDERS_HISTORY',
        payload: orders
    }
}