<script setup>
import VehicleCard from "@/components/VehicleCard.vue";

defineProps({
  id: Number,
  start: String,
  end: String
})

</script>

<template>
  <h1>Reserve Vehicle</h1>
  <h2>Start: {{start}}  End: {{end}}</h2>
  <VehicleCard :vehicle="vehicle" :types="types"></VehicleCard>
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
    console.log( "Id is" + this.id );
    this.getVehicle(this.id);
  },
  created() {
    this.getTypes();
  }
}
</script>