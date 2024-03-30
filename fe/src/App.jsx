import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, NotFound } from "./components";
import './custom.scss';
import { HomePage, ListHotel, NewHotel } from "./pages";
import "react-toastify/dist/ReactToastify.css";

 
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/danh-sach-hotel",
          element: <ListHotel />,
        },
        {
          path: "/tao-hotel",
          element: <NewHotel  />,
        }
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
