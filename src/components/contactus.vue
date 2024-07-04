<template>
  <v-container class="contact-us" fluid>
    <v-row justify="center">
      <v-col cols="12" md="12" class="text-center">
        <h2 class="title">Contact Us</h2>
        <p class="subtitle">
          For inquiries or feedback, please complete this form or email us at
          <a
            class="anchor-catering fw-600"
            href="mailto:help@aladdinhouston.com"
            >help@aladdinhouston.com</a
          >
        </p>
      </v-col>
    </v-row>
    <v-form>
      <v-row no-gutters justify="center" class="pa-16">
        <v-col cols="12" md="6">
          <v-text-field
            class="catering-text-field ml-4"
            placeholder="Full Name"
            hide-details="auto"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="catering-text-field ml-4"
            placeholder="Phone Number"
            hide-details="auto"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            class="catering-text-field ml-4"
            placeholder="Email"
            hide-details="auto"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="Date"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="Time"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea
            class="catering-text-field ml-4"
            placeholder="Message"
          ></v-textarea>
        </v-col>
        <v-col cols="12" class="text-center px-2 my-4">
          <v-btn block class="submit-btn" color="black" dark>Submit</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "ContactUs",
};
</script>

<style scoped>
.contact-us {
  background-color: #fe734a;
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
