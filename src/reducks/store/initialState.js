// StoreのStateの初期値
const initialState = {
  products: {
    list: []
  },
  users: {
    cart: [],
    isSignedIn: false,
    orders: [],
    role: '',
    uid: '',
    username: 'user'
  }
};

export default initialState;