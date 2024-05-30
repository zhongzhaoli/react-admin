import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import RouterComponent from './router';

import 'normalize.css';
import './styles/index.less';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RouterComponent />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
