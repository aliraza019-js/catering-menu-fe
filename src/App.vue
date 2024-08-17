<template>
  <v-app>
    <Snackbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
const Snackbar = () => import(/* webpackChunkName: "snackbar" */ '@/components/common/snackbar.vue');
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
