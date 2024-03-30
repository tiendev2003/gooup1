import { configureStore } from '@reduxjs/toolkit';
import hotelSlice from './hotelSlice';

export default configureStore({
  reducer: {
    hotels: hotelSlice,
  },
});