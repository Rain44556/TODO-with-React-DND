import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import HomeLayout from './components/layout/HomeLayout.jsx'
import Home from './components/Home/Home.jsx'
import { ToastContainer } from 'react-toastify'

const router = createBrowserRouter([
{
  path: "/",
  element: <HomeLayout></HomeLayout>,
  children: [
    {
      path: "/",
      element: <Home></Home>
    }
  ]
}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}></RouterProvider>
  <ToastContainer />
  </StrictMode>,
)
