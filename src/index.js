import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from './reducks/store/store';
// import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export const store = createStore();

ReactDOM.render(
  // Provider: ラップしたcomponentにstoreの情報を渡すことができるヤツ。また`connect`関数を使えるようにもしてくれるヤツ
  // propsにstoreを渡す
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
