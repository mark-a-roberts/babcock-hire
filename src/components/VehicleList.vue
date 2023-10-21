<script setup>
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import VehicleCard from "@/components/VehicleCard.vue";
</script>

<template>
  <div>
    <h1>Vehicles</h1>
    <v-row>
      <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
              v-model="start"
              label="Start Date"
              prepend-icon="event"
              readonly
              v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="start" @input="menu1 = false"></v-date-picker>
      </v-menu>
      <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
              v-model="end"
              label="End Date"
              prepend-icon="event"
              readonly
              v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="end" @input="menu2 = false"></v-date-picker>
      </v-menu>
    </v-row>


    <VehicleCard v-for="vehicle in available()"
                 :vehicle="vehicle"
                 :key="vehicle.id"
                 :types="types"
    >
      <template #actions>
        <v-card-actions v-if="start">
          <v-btn color="indigo-darken-3" :to="{ name: 'reserve', params: { id: vehicle.id, start: start, end: end }}"
          >Select vehicle
          </v-btn>
        </v-card-actions>
      </template>
    </VehicleCard>

  </div>
</template>

<script>
const hireAPI = "http://localhost:3000"
export default {
  data() {
    return {
      menu1: false,
      menu2: false,
      start: new Date().toISOString().slice(0, 10),
      end: new Date().toISOString().slice(0, 10),
      types: [],
      bookings: [],
      vehicles: []
    }
  },
  methods: {
    // get list of bookings within date range
    reservations(vehicle, start, end) {
      // only bookings for vehicle in time frame
      const period = {
        from: new Date( start),
        to: new Date(end)
      }
      return this.bookings.filter(
          (b) => {
            if (b.id === vehicle.id) {
              // convert booking ISO into Date*
              const book  = {
                from: new Date(b.from),
                to: new Date(b.to)
              }
              return (book.from < period.to) && (book.to > period.from)
            }
            return false;
          }
      )
    },
    // get list of available vehicles
    available() {
      return this.vehicles.filter(
          (v) => {
            // only bookings for vehicle in time frame
            const bookings = this.reservations(v, this.start, this.end)
            // check for vehicle in bookings
            return bookings.length === 0;
          }
      )
    },
    async getBookings(start, end) {
      const params = new URLSearchParams( { start, end }).toString();
      this.bookings = await fetch( `${hireAPI}/bookings?${params}`).then((res) => res.json())
    },
    async getTypes() {
      this.types = await fetch( `${hireAPI}/types`).then((res) => res.json())
    },
    async getVehicles() {
      this.vehicles = await fetch(`${hireAPI}/vehicles`).then((res) => res.json())
    },
  },
  created() {
    this.getTypes();
    this.getVehicles();
    this.getBookings( this.start, this.end);
  }

}
</script>