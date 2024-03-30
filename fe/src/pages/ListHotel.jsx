import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteHotel, getAllHotel } from "../store/hotelSlice";
export default function ListHotel() {
  const { hotels, loading } = useSelector((state) => state.hotels);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllHotel());
  }, [dispatch]);
  function handleDelete(id) {
    try {
      dispatch(deleteHotel({ id }));
      toast.success("Delete Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
         
      });
    } catch (error) {
      toast(error.message);
      console.log(error.message);
    }
  }
  return (
    <div className="min-vh-100 pt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="">ListHotel</h1>

        <div>
          <Link to="/tao-hotel" className="btn btn-primary ">
            <i className="fa-solid fa-plus me-2"></i>
            Thêm khách sạn
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Tên khách sạn</th>
              <th>Price</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              loading && (
                <tr>
                  <td colSpan="4" className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              )
            }
            {hotels.map((hotel, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{hotel.name}</td>
                <td>{hotel.price}</td>
                <td>
                  <Link
                    to="/tao-hotel"
                    state={{ hotel: hotel }}
                    className="btn btn-primary me-2"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <button
                    onClick={() => handleDelete(hotel.id)}
                    className="btn btn-danger "
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
