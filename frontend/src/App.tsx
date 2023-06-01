import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import {Home,ProductPage,SearchPage,LoginPage,CheckOut, Account, HelpPage} from "./pages";
import store from "./redux/store";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/offers",
    element: <Home />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/support",
    element: <HelpPage />,
  },
  {
    path: "/my-account",
    element: <Account />,
  },
  {
    path: "/checkout",
    element: <CheckOut />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <LoginPage />,
  },
  {
    path: "/restaurants/:product",
    element: <ProductPage />,
    
  },
  {
    path: "*",
    element: <Home />,
  },
]);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
