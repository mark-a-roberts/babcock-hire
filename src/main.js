import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'

import {createRouter, createWebHashHistory} from 'vue-router'

import store from "@/store";
// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import Home from "@/components/Home.vue";
import VehicleList from "@/components/VehicleList.vue";
import VehicleReserve from "@/components/VehicleReserve.vue";

const vuetify = createVuetify({
  components,
  directives
})

// 1. Define route components.
// These can be imported from other files
const About = {template: '<div>About</div>'}

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/reserve/:id/:start/:end',
    name: 'reserve',
    component: VehicleReserve,
    props: true
  },
  {
    path: '/book/:id/:start/:end',
    name: 'book',
    component: VehicleReserve,
    props: true
  },
  {
    path: '/vehicles',
    name: 'vehicles',
    component: VehicleList
  },
  {path: '/about', name: 'about', component: About},
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

createApp(App).use(store).use(router).use(vuetify).mount('#app')
