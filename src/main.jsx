import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Chat from './Chat.jsx'
import Layout from './Layout.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Hero from './Hero.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      { path: "", element: <Hero/>},
      { path: "dashboard", element: <App/> },
      { path: "chatbot", element: <Chat/> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);