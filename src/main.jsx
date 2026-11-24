import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './style.css';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App pathname={window.location.pathname} />
  </React.StrictMode>
);
const pathname = window.location.pathname.replace(/\/+$/, '') + '/';
if (import.meta.env.DEV && pathname !== '/') import('./inner-pages.css');
const prerenderedPath = root.dataset.prerendered === 'home' ? '/' : root.dataset.prerendered;
if (prerenderedPath === pathname) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
