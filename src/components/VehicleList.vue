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

    <VehicleCard v-for="vehicle in available"
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

import {mapActions, mapGetters} from "vuex";
import {isProxy,toRaw} from "vue";

export default {
  data() {
    const today = new Date().toISOString().slice(0, 10);
    return {
      menu1: false,
      menu2: false,
      today,
      start: today,
      end: today
    }
  },
  computed: {
    // map this.bookings to 'bookings/getBookings'
    ...mapGetters( 'types', { types: 'getTypes', byCode: 'byCode' }),
    ...mapGetters( 'vehicles', { vehicles: 'getVehicles', byId: 'byId' }),
    ...mapGetters( 'bookings', {
      bookings: 'getBookings',
      between: 'between',
      vehicleBookings: 'vehicle'
    }),
    // get list of available vehicles
    available() {
      const vehicles = isProxy(this.vehicles) ? toRaw(this.vehicles) : this.vehicles;
      return vehicles.filter(
          (v) => {
            // only bookings for vehicle in time frame
            const bookings = this.vehicleBookings(v.id, this.start, this.end)
            // check for vehicle in bookings
            return bookings.length === 0;
          }
      )
    }
  },
  methods: {
    ...mapActions('types', [ 'setTypes']),
    ...mapActions('vehicles', [ 'setVehicles']),
    ...mapActions('bookings', [ 'setBookings'])
  },
  created() {
    // actions to start API calls
    this.setTypes();
    this.setVehicles();
    this.setBookings();
  }

}
</script>