<script setup>
import VehicleCard from "@/components/VehicleCard.vue";
</script>

<template>
  <div>
    <h1>Vehicles</h1>
    <v-row>
      <v-text-field
          v-model="start"
          type="date"
          :min="today"
          label="Start Date"
          prepend-icon="event"
      ></v-text-field>
      <v-text-field
          v-model="end"
          type="date"
          :min="today"
          label="End Date"
          prepend-icon="event"
      ></v-text-field>

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

import { isProxy, toRaw } from 'vue';

const hireAPI = "http://localhost:3000"
export default {
  data() {
    const today = new Date().toISOString().slice(0, 10);
    return {
      menu1: false,
      menu2: false,
      today,
      start: today,
      end: today,
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
        from: new Date(start),
        to: new Date(end)
      }


      const bookings = isProxy(this.bookings) ? toRaw(this.bookings): this.bookings;

      return bookings.filter(
          (b) => {
            const book = {
              id: b.vehicle_id,
              from: new Date(b.from),
              to: new Date(b.to)
            }

            if (b.vehicle_id == vehicle.id) {
              // convert booking ISO into Date*
              console.log( `Check: ${vehicle.id}`);
              console.log(period);
              console.log( book);
              return (book.from <= period.to) && (book.to >= period.from)
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
      const params = new URLSearchParams({start, end}).toString();
      this.bookings = await fetch(`${hireAPI}/bookings?${params}`).then((res) => res.json())
      console.log( "bookings")
      console.log( this.bookings);
    },
    async getTypes() {
      this.types = await fetch(`${hireAPI}/types`).then((res) => res.json())
    },
    async getVehicles() {
      this.vehicles = await fetch(`${hireAPI}/vehicles`).then((res) => res.json())
    },
  },
  created() {
    this.getTypes();
    this.getVehicles();
    this.getBookings(this.start, this.end);
  }

}
</script>