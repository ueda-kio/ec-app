//! Actionsは「プレーンなオブジェクトを返す」
// 純粋にデータだけを記述するため

export const SIGN_IN = 'SIGN_IN'; // reducersにActionのタグを渡す
export const signInAction = (userState) => { // user情報を引数に受け取る
  return {
    type: 'SIGN_IN',
    payload: {
      isSignedIn: true,
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
      isSignedIn: false,
      uid: '',
      username: 'Guest'
    }
  }
};