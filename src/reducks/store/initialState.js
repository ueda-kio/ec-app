// StoreのStateの初期値
const initialState = {
  products: {
    list: []
  },
  users: {
    cart: [],
    isSignedIn: false,
    role: '',
    uid: '',
    username: 'user'
  }
};

export default initialState;