import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HotelServices from "../services/HotelServices";

export const createHotel = createAsyncThunk(
  "hotels/create",
  async ({ name, price }) => {
    const res = await HotelServices.createHotel({ name, price });
    return res.data;
  }
);

export const getAllHotel = createAsyncThunk("hotels/all", async () => {
  const res = await HotelServices.getHotels();
  
  return res.data.data;
});

export const updateHotel = createAsyncThunk(
  "hotels/update",
  async ({ id, data }) => {
    const res = await HotelServices.updateHotel(id, data);
    return res.data.data;
  }
);

export const deleteHotel = createAsyncThunk("hotels/delete", async ({ id }) => {
  await HotelServices.deleteHotel(id);
  return { id };
});

export const deleteAllHotels = createAsyncThunk(
  "hotels/deleteAll",
  async () => {
    const res = await HotelServices.removeAll();
    return res.data;
  }
);

export const findByHotel = createAsyncThunk(
  "hotels/findById",
  async ({ id }) => {
    const res = await HotelServices.getHotelById(id);
    return res.data;
  }
);

const hotelSlice = createSlice({
  name: "hotels",
  initialState: {
    hotels: [],
    hotel: {},
    loading: false,
    waiting: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHotel.pending, (state) => {
        state.loading = true;
      })
      .addCase(createHotel.fulfilled, (state, action) => {
        state.waiting = false;
        state.loading = false;
        state.hotels.push(action.payload);
      })
      .addCase(createHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllHotel.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllHotel.fulfilled, (state, action) => {
        state.waiting = false;
        state.loading = false;
        state.hotels = action.payload;
      })
      .addCase(getAllHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateHotel.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        state.waiting = false;
        state.loading = false;
        state.hotels = state.hotels.map((hotel) => {
          if (hotel.id === action.payload.id) {
            return action.payload;
          }
          return hotel;
        });
      })
      .addCase(updateHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteHotel.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.waiting = false;
        state.loading = false;
        state.hotels = state.hotels.filter(
          (hotel) => hotel.id !== action.payload.id
        );
      })
      .addCase(deleteHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(findByHotel.pending, (state) => {
        state.loading = true;
      })
      .addCase(findByHotel.fulfilled, (state, action) => {
        state.waiting = false;
        state.loading = false;
        state.hotel = action.payload;
      })

      .addCase(findByHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer } = hotelSlice;
export default reducer;
