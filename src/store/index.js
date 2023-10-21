import { createStore } from 'vuex'
import types from "./modules/types";
import vehicles from './modules/vehicles';
import bookings from "./modules/bookings";
import notifications from "./modules/notifications";
export default createStore({
  modules: {
    types,
    vehicles,
    bookings,
    notifications
  }
})