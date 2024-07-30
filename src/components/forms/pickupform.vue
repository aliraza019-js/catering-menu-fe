<template>
  <v-container class="pickup-form-container" fluid>
    <v-row justify="center">
      <v-col cols="12" md="12" class="text-center">
        <h2 class="title">Pick Up Information</h2>
      </v-col>
    </v-row>
    <v-form ref="pickupform" v-model="valid">
      <v-row no-gutters justify="center" class="pa-16">
        <v-col class="mt-2" cols="12" md="6" :lg="6" :xs="6">
          <v-text-field
            v-model="pickupFormData.firstname"
            class="catering-text-field ml-4"
            placeholder="First Name"
            hide-details="auto"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col class="mt-2" cols="12" md="6" :lg="6" :xs="6">
          <v-text-field
            v-model="pickupFormData.lastname"
            class="catering-text-field ml-4"
            placeholder="Last Name"
            hide-details="auto"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col class="mt-2" cols="12" md="12" :lg="12" :xs="12">
          <v-text-field
            v-model="pickupFormData.businessname"
            class="catering-text-field ml-4"
            placeholder="Business Name"
            hide-details="auto"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col class="mt-2" cols="12" md="12" :lg="12" :xs="12">
          <v-text-field
            v-model="pickupFormData.email"
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="Email"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
        </v-col>
        <v-col class="mt-2" cols="12" md="12" :lg="12" :xs="12">
          <v-text-field
            v-model="pickupFormData.phonenumber"
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="Phone Number"
            :rules="[rules.required, rules.phone]"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import EventBus from "@/eventBus";

export default {
  name: "pickupform",
  data() {
    return {
      valid: false,
      pickupFormData: {
        firstname: '',
        lastname: '',
        businessname: '',
        email: '',
        phonenumber: ''
      },
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
        phone: value => {
          const pattern = /^\d{11}$/;
          return pattern.test(value) || 'Invalid phone number.';
        }
      }
    };
  },
  watch: {
    pickupFormData: {
      deep: true,
      handler(newValue) {
        if (this.areAllFieldsFilled(newValue)) {
          this.$emit('pickup-form-data', newValue);
          EventBus.$emit('show-snackbar', {
                message: 'Thank you for filling pickupform Information',
                type: 'success'
              });
        } else {
          const filledFields = this.countFilledFields(newValue);
          setTimeout(() => {
          if (filledFields > 2) {
              EventBus.$emit('show-snackbar', {
                message: 'Please fill out all required fields.',
                type: 'error'
              });
            }
          }, 1000);
        }
      }
    }
  },
  methods: {
    areAllFieldsFilled(formData) {
      return Object.values(formData).every(field => field !== '');
    },
    countFilledFields(formData) {
      return Object.values(formData).filter(field => field !== '').length;
    }
  }
};
</script>

<style scoped>
.pickup-form-container {
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

.v-text-field,
.v-textarea {
  background-color: white;
  border-radius: 8px;
}
</style>
