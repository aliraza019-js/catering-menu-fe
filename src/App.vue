<template>
  <v-app>
    <Snackbar v-once/>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import snackbar from './components/common/snackbar.vue';
export default {
  name: "App",
  components: {
    snackbar,
  },

  data: () => ({
    //
  }),
};
</script>
