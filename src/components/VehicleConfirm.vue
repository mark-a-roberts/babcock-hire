<script setup>

import VehicleCard from "@/components/VehicleCard.vue";

defineProps({
  id: { type: Number, default: 1},
  start: { type: String, default: '2023-10-20'},
  end: { type: String, default: '2023-10-20'}
})
</script>

<template>
  <h1>Vehicle Booked!</h1>
  <h2>Start: {{start}}  End: {{end}}</h2>
  <VehicleCard v-if="vehicle" :vehicle="vehicle" :types="types">
  </VehicleCard>
  <p v-else>
    No vehicle found
  </p>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters( 'types', { types: 'getTypes', byCode: 'byCode' }),
    ...mapGetters( 'vehicles', { vehicles: 'getVehicles', byId: 'byId' }),
    vehicle: function () {
      return this.byId(this.id)
    }
  },
  methods: {
    ...mapActions('bookings', [ 'createBooking']),
    ...mapActions('types', [ 'setTypes']),
    ...mapActions('vehicles', [ 'setVehicles']),

    category(item) {
      const t = this.types?.find( (t) => t.type === item.category)
      return t ? t.name : ""
    },
    dailyRate(item) {
      const t = this.types?.find( (t) => t.type === item.category)
      return t ? t.cost : ""
    }
  },
  created() {
    this.setTypes();
    this.setVehicles();
  }
}
</script>