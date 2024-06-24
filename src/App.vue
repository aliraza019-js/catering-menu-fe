<template>
  <v-app>
    <Navbar />
    <Snackbar />
    <!-- <v-app-bar app color="#F6F0ED">
    </v-app-bar> -->

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Snackbar from "@/components/common/snackbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Snackbar,
  },

  data: () => ({
    //
  }),
};
</script>
