<template>
  <v-app>
    <!-- <Navbar /> -->
    <Snackbar />
    <!-- <v-app-bar app color="#F6F0ED">
    </v-app-bar> -->

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
const Snackbar = () => import('@/components/common/snackbar.vue');
export default {
  name: "App",
  components: {
    // Navbar,
    Snackbar,
  },

  data: () => ({
    //
  }),
};
</script>
