<script setup>
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import VehicleCard from "@/components/VehicleCard.vue";
</script>

<template>
  <div>
    <h1>Vehicles</h1>
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

    <VehicleCard v-for="v in available()" :vehicle="v" :key="v.id" :types="types" :start="start" :end="end"></VehicleCard>

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
      return this.bookings.filter(
          (b) => (b.id === vehicle.id && (b.start < end) && (b.end > start) )
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