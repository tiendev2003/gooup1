import http from "./http-common";

class HotelServices {
  getHotels() {
    return http.get('/api/hotels');
  }
  getHotelById(id) {
    return http.get('/api/hotels/' + id);
  }
  createHotel(data) {
    return http.post( '/api/hotels/', data);
  }
  updateHotel(id, data) {
    return http.put(`/api/hotels/${id}`, data);
  }
  deleteHotel(id) {
    return http.delete('/api/hotels/' + id);
  }
}

export default new HotelServices();