import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import RouterCom from './router';
import store from './store';

import 'normalize.css';
import './styles/index.less';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RouterCom />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
