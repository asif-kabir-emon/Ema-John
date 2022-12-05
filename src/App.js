import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Main from "./layouts/Main";
import Shop from "./components/Shop/Shop";
import Orders from "./components/Orders/Orders";
import { productsAndCartLoader } from "./loaders/productsAndCartLoader";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Shipping from "./components/Shipping/Shipping";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Shop></Shop>,
        },
        {
          path: "/home",
          element: <Shop></Shop>,
        },
        {
          path: "/orders",
          loader: productsAndCartLoader,
          element: (
            <PrivateRoute>
              <Orders></Orders>
            </PrivateRoute>
          ),
        },
        {
          path: "/shipping",
          element: (
            <PrivateRoute>
              <Shipping></Shipping>
            </PrivateRoute>
          ),
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/signup",
          element: <SignUp></SignUp>,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
