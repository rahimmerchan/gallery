import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NewPage from './components/newPage.jsx';
import ViewPage from './Pages/ViewPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/newpage",
    element: <NewPage/>
  },
  {
    path: "/login",
    element: <NewPage/>
  },
  {
    path: "/viewpage",
    element: <ViewPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
