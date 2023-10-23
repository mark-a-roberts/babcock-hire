<script setup>

import VehicleCard from "@/components/VehicleCard.vue";

defineProps({
  id: { type: Number, default: 1},
  start: { type: String, default: '2023-10-20'},
  end: { type: String, default: '2023-10-20'}
})

</script>

<template>
  <h1>Reserve Vehicle</h1>
  <h2>Start: {{start}}  End: {{end}}</h2>
  <VehicleCard :vehicle="vehicle" :types="types">
    <template #actions>
      <v-card-actions v-if="start">
        <v-btn color="indigo-darken-3" @click="bookIt" :to="{ name: 'book', params: { id: vehicle.id, start: start, end: end }}"
        >Make Booking
        </v-btn>
      </v-card-actions>
    </template>
  </VehicleCard>
</template>

<script>
import { mapActions } from 'vuex';
import store from "@/store";

const hireAPI = "http://localhost:3000"

export default {
  data() {
    return {
      types: [],
      vehicle: {}
    }
  },
  methods: {
    ...mapActions([
      // map `this.createBooking(booking)` to `this.$store.dispatch('makeBooking', booking)`
      'bookings/createBooking',
    ]),
    category(item) {
      const t = this.types?.find( (t) => t.type === item.category)
      return t ? t.name : ""
    },
    dailyRate(item) {
      const t = this.types?.find( (t) => t.type === item.category)
      return t ? t.cost : ""
    },
    async getTypes() {
      this.types = await fetch( `${hireAPI}/types`).then((res) => res.json())
    },
    async getVehicle(id) {
      console.log("Id:" + id);
      this.vehicle = await fetch(`${hireAPI}/vehicles/${id}`).then((res) => res.json())
    },
    async bookIt() {
      await store.dispatch('bookings/createBooking', {
        vehicle_id: this.id,
        from: this.start,
        to: this.end
      })
    }
  },
  mounted() {
    this.getVehicle(this.id);
  },
  created() {
    this.getTypes();
  }
}
</script>