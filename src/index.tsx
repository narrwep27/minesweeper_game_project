import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import BeginnerPage from './pages/BeginnerPage';
import './index.css';
import IntermediatePage from './pages/IntermediatePage';
import ExpertPage from './pages/ExpertPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <BeginnerPage />
  },
  {
    path: "/intermediate",
    element: <IntermediatePage />
  },
  {
    path: "/expert",
    element: <ExpertPage />
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
