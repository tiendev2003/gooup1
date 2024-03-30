import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: "60px" }}>
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
}
