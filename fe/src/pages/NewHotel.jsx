import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createHotel, updateHotel } from "../store/hotelSlice";
NewHotel.propTypes = {
  hotel: PropTypes.object,
};
export default function NewHotel() {
  let { state } = useLocation();
  const navigation = useNavigate();
  let hotel = state?.hotel;

  const [name, setName] = useState(hotel ? hotel.name : "");
  const [price, setPrice] = useState(hotel ? hotel.price : "");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (hotel) {
      setName(hotel.name);
      setPrice(hotel.price);
    }
  }, [hotel]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: name,
      price: price,
    };
    if (!name) {
      return setError("Name is required");
    }
    if (!price) {
      return setError("Price is required");
    }
    try {
      if (hotel) {
        const id = state?.hotel.id;
        await dispatch(updateHotel({ id, data })).unwrap();
      } else {
        await dispatch(createHotel(data)).unwrap();
      }
      navigation("/danh-sach-hotel");
      toast.success("Add Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/danh-sach-hotel">Danh sách Hotel</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {hotel ? "Update Hotel" : "New Hotel"}
          </li>
        </ol>
      </nav>

      <div
        className="d-flex justify-content-center align-items-center "
        style={{
          minHeight: "80vh",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="   ">
            {error && <p className="text-danger">{error}</p>}
            <div className="form-group mb-3">
              <label htmlFor="name" className="mb-2">
                Name :
              </label>
              <input
                type="text"
                id="name"
                autoFocus={true}
                className="form-control"
                placeholder="Name"
                defaultValue={name}
                title="Nhập ít nhất 3 ký tự"
                pattern="^[a-z0-9\s]*$"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Price" className="mb-2">
                Price :
              </label>
              <input
                type="number"
                id="Price"
                className="form-control"
               
                onChange={(e) => setPrice(e.target.value)}
                defaultValue={price}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-3 align-items-center"
          >
            {hotel ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </>
  );
}
