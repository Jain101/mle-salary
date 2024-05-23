import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './components/Dashboard.jsx'
import Chat from './components/Chat.jsx'
import Layout from './Layout.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Hero from './components/Hero.jsx'

// This is the main entry point for the application, so I think I should fetch dataset here and pass it down to the components that need it.

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Hero /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "chatbot", element: <Chat /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);