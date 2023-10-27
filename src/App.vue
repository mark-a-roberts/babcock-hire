<script setup>
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-title>
        <img alt="Vue logo" class="logo" src="./assets/babcock-logo.svg" width="125" height="125"/>
        Vehicle Hire
      </v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer theme="dark" class="bg-deep-purple" width="100">
      <v-list nav=true density="compact">
        <v-list-item nav=true to="/" title="Home">
        </v-list-item>
        <v-list-item nav=true to="/vehicles" title="Vehicles">
        </v-list-item>
        <v-list-item nav=true to="/about" title="About">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid=true>
        <router-view/>
      </v-container>
    </v-main>
    <v-footer>(c) 2023 Mark Roberts</v-footer>
  </v-app>
</template>

