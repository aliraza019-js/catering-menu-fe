<template>
  <v-container class="order-status-container" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <v-img src="@/assets/order-success.png" class="status-icon"></v-img>
        <h1 class="status-title">Order Successful!</h1>
        <p class="status-message">
          Thank you so much for your order! We'll send you a shipping confirmation email.
        </p>
        <v-btn color="orange" class="status-button" @click="goBack">
          Back to Catering
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "OrderSuccess",
  methods: {
    goBack() {
      this.$router.push("/catering");
    }
  }
};
</script>
<style scoped>
.order-status-container {
  background-color: #000;
  color: white;
  padding: 2rem;
  text-align: center;
}

.status-icon {
  width: 100px;
  height: 100px;
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
