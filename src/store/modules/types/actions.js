const apiRoot = "http://localhost:3000";

export default {
  async setTypes({ commit }) {
    try {
      const url=`${apiRoot}/types`
      const response = await fetch(url).then( res=>res.json());

      // added in case mapping needed
      const types = response;

      commit('setTypes', types);

    } catch (error) {
      const notification = "An error occurred during fetching vehicles.Please try again.";
      commit("notifications/setNotification", notification, { root: true })
    }
  }
}