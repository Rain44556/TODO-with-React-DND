import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import HomeLayout from './components/layout/HomeLayout.jsx'
import Home from './components/Home/Home.jsx'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './provider/AuthProvider.jsx'
import SignInWithGoogle from './provider/authentication/SignInWithGoogle.jsx'
import AddTask from './components/AddTask.jsx'
import PrivateRoute from './privateRoute/PrivateRoute.jsx'
import CategoryLists from './components/CategoryLists.jsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const router = createBrowserRouter([
{
  path: "/",
  element: <HomeLayout></HomeLayout>,
  children: [
    {
      path: "/",
      element: <Home></Home>
    },
    {
      path: "/googleLogin",
      element: <SignInWithGoogle></SignInWithGoogle>
    },
    {
      path: "/addTask",
      element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
    },
    {
      path: "/categoryLists",
      element: <PrivateRoute><CategoryLists></CategoryLists></PrivateRoute>,
    }
  ]
}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AuthProvider>
 <DndProvider backend={HTML5Backend}>
 <RouterProvider router={router}></RouterProvider>
 </DndProvider>
 <ToastContainer />
 </AuthProvider>
  </StrictMode>,
)
