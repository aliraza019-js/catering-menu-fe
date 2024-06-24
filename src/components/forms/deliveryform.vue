<template>
  <v-container class="delivery-form-container" fluid>
    <v-row justify="center">
      <v-col cols="12" md="12" class="text-center">
        <h2 class="title">Deliver Information</h2>
      </v-col>
    </v-row>
    <v-form>
      <v-row no-gutters justify="center" class="pa-16">
        <v-col cols="12" md="6">
          <v-text-field
            class="catering-text-field ml-4"
            placeholder="First Name"
            hide-details="auto"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="catering-text-field ml-4"
            placeholder="Last Name"
            hide-details="auto"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            class="catering-text-field ml-4"
            placeholder="Business Name"
            hide-details="auto"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="Email"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="Phone Number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="Adress"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="Adress 2"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="City"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="State"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="ZIP Code"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "deliveryform",
};
</script>

<style scoped>
.delivery-form-container {
  background-color: #ed3a1b;
  color: white;
  padding: 2rem 0;
  background-image: url("@/assets/bg-logo.png");
  background-size: cover;
  background-position: center;
}

.title {
  font-size: 42px !important;
  font-weight: bold !important;
  font-family: poppins !important;
}

.subtitle {
  margin: 1rem 0;
  font-size: 15px !important;
  font-family: poppins !important;
}

a {
  color: white;
  text-decoration: underline;
}

.v-text-field,
.v-textarea {
  background-color: white;
  border-radius: 8px;
}

.v-btn {
  width: 150px;
  background-color: black;
  color: white;
}

.anchor-catering {
  color: white !important;
}

.submit-btn.v-btn {
  background-color: black !important;
  height: 54px !important;
  border-radius: 8px !important;
}
</style>
