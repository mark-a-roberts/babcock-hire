<script setup>
defineProps({
  vehicle: Object,
  types: Array,
  start: String,
  end: String
})

</script>

<template>
  <v-card width="400"
          color="#dddddd"
          class="ma-2"
  >
    <v-card-item>
      <v-card-title>{{ vehicle.reg }}</v-card-title>
      <v-card-subtitle>{{ vehicle.make }} {{ vehicle.model }}</v-card-subtitle>
    </v-card-item>
    <slot name="text">
      <v-card-text>
        <p>Vehicle type: {{ vehicle.category }}</p>
        <p>Fuel: {{ vehicle.fuel }}</p>
        <p>Cost/day: £{{ dailyRate(vehicle) }}</p>
      </v-card-text>
    </slot>
    <slot name="actions"></slot>
  </v-card>
</template>

<script>
export default {
  methods: {
    category(item) {
      const t = this.types?.find( (t) => t.type === item.category)
      return t ? t.name : ""
    },
    dailyRate(item) {
      const t = this.types?.find( (t) => t.type === item.category)
      return t ? t.cost : ""
    }
  }
}
</script>