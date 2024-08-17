<template>
  <v-app>
    <Snackbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
const Snackbar = () => import(/* webpackPrefetch: true */ '@/components/common/snackbar.vue');
export default {
  name: "App",
  components: {
    Snackbar,
  },

  data: () => ({
    //
  }),
};
</script>
