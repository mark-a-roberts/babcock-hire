<script setup>
import VehicleCard from "@/components/VehicleCard.vue";

defineProps({
  id: { type: Number, default: 1},
  start: { type: String, default: '23-10-2023'},
  end: { type: String, default: '20-10-2023'}
})

</script>

<template>
  <h1>Reserve Vehicle</h1>
  <h2>Start: {{start}}  End: {{end}}</h2>
  <VehicleCard :vehicle="vehicle" :types="types">
    <template #actions>
      <v-card-actions v-if="start">
        <v-btn color="indigo-darken-3" :to="{ name: 'book', params: { id: vehicle.id, start: start, end: end }}"
        >Make Booking
        </v-btn>
      </v-card-actions>
    </template>
  </VehicleCard>
</template>

<script>
const hireAPI = "http://localhost:3000"

export default {
  data() {
    return {
      types: [],
      vehicle: {}
    }
  },
  methods: {
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
  },
  mounted() {
    this.getVehicle(this.id);
  },
  created() {
    this.getTypes();
  }
}
</script>