<template>
  <v-container class="order-status-container" fluid>
      <v-row class="h-100 d-flex" justify="center" align="center">
        <v-col cols="12" md="8" class="text-center">
          <v-img src="@/assets/order-cancel.png" class="status-icon mx-auto"></v-img>
          <h1 class="status-title">Order Cancelled!</h1>
          <p class="status-message">
            We're sorry, but your order has been cancelled. If you have any questions, please contact us.
          </p>
          <!-- <v-btn color="orange" class="status-button" @click="goBack">
            Back to Catering
          </v-btn> -->
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
  name: "OrderCancel",
  methods: {
    goBack() {
      this.$router.push("/catering");
    }
  }
};
</script>

<style scoped>
.order-status-container {
  background-color: #fff !important;
  color: #000 !important;
  padding: 2rem !important;
  text-align: center !important;
}

.status-icon {
  width: 250px;
  height: 250px;
  margin-bottom: 1rem;
}

.status-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.status-message {
  font-size: 18px;
  margin-bottom: 2rem;
}

.status-button {
  background-color: #ed3a1b;
  color: white;
  font-size: 16px;
  font-weight: bold;
}
</style>
