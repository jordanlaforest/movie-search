import 'react-app-polyfill/ie11';
import 'intersection-observer';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Footer from './components/Footer';
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Footer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);