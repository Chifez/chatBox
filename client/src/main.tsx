import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './Page/auth/SignUp.tsx';
import Create from './Page/auth/Create.tsx';
import Join from './Page/auth/Join.tsx';
import Chat from './Page/chat/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/auth/signup',
    element: <SignUp />,
  },
  {
    path: '/auth/create',
    element: <Create />,
  },
  {
    path: '/auth/join',
    element: <Join />,
  },
  {
    path: '/chat/:id',
    element: <Chat />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
