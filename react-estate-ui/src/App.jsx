
import "./Responsive.scss"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home/Home"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import List from "./Pages/List/List";
import  { Layout,AuthLayout } from "./Pages/Layout/Layout";
import Login from "./Pages/Login/Login";
import Singlepage from "./Pages/Singlepage/Singlepage";
import Profilepage from "./Pages/Profilepage/Profilepage";
import Register from "./Pages/Register/Register";
import Profileupdate from "./Pages/Profileupdate/Profileupdate";
import Newpost from "./Pages/Newpost/Newpost";
import { listpageloader, singlepageloader, profilepageloader } from "./Lib/Loaders";
 

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
      <Layout></Layout>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        }, {
          path: "/list",
          element: <List />,
          loader:listpageloader
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/:id",
          element: <Singlepage />,
          loader:singlepageloader
        },
      ]
    },

    {
      path: "/",
      element: (
      <AuthLayout></AuthLayout>
      ),
      children: [
        {
          path: "/profile",
          element: <Profilepage />,
          loader:profilepageloader
        },   {
          path: "/profile/update",
          element: <Profileupdate />,
        }, {
          path: "/add",
          element: <Newpost />,
        },
        ]
    },
  
  ]);

  return (
   <RouterProvider router={router}></RouterProvider>
  )
}

export default App