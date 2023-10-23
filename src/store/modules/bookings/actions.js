const apiRoot = "http://localhost:3000";

export default {
  async setBookings({ commit }) {
    try {
      const url=`${apiRoot}/bookings`
      const response = await fetch(url).then( res=>res.json());

      // added in case mapping needed
      const items = response;

      commit('setBookings', items);

    } catch (error) {
      const notification = "An error occurred during fetching bookings.Please try again.";
      commit("notifications/setNotification", notification, { root: true })
    }
  },
  async createBooking({commit}, booking) {
    try {
      const url=`${apiRoot}/bookings`;
      const response = await fetch( url, {
        method: 'POST',
        body: JSON.stringify(booking),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      // return all bookings?
      const items = response;
      commit('setBookings', items);
    } catch (error) {
      const notification = "An error occurred creating a booking.Please try again.";
      commit("notifications/setNotification", notification, { root: true })
    }
  }
}