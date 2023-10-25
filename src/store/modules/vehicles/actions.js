const apiRoot = import.meta.env.VITE_HIRE_API;

export default {
  async setVehicles({ commit }) {
    try {
      const url=`${apiRoot}/vehicles`
      const response = await fetch(url).then( res=>res.json());

      // added in case mapping needed
      const items = response;

      commit('setVehicles', items);

    } catch (error) {
      const notification = "An error occurred during fetching vehicles.Please try again.";
      commit("notifications/setNotification", notification, { root: true })
    }
  }
}