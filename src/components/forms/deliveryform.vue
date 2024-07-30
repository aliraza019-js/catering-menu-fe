<template>
  <v-container class="delivery-form-container" fluid>
    <v-row justify="center">
      <v-col cols="12" md="12" class="text-center">
        <h2 class="title">Deliver Information</h2>
      </v-col>
    </v-row>
    <v-form ref="deliveryform" v-model="valid">
      <v-row no-gutters justify="center" class="pa-16">
        <v-col class="my-2" cols="12" md="6" lg="6" xs="6">
          <v-text-field
            v-model="deliveryFormData.firstname"
            class="catering-text-field ml-4"
            placeholder="First Name"
            hide-details="auto"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col class="my-2" cols="12" md="6" lg="6" xs="6">
          <v-text-field
            v-model="deliveryFormData.lastname"
            class="catering-text-field ml-4"
            placeholder="Last Name"
            hide-details="auto"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col class="my-2" cols="12" md="12" lg="12" xs="12">
          <v-text-field
            v-model="deliveryFormData.businessname"
            class="catering-text-field ml-4"
            placeholder="Business Name"
            hide-details="auto"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col class="my-2" cols="12" md="12" lg="12" xs="12">
          <v-text-field
            v-model="deliveryFormData.email"
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="Email"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
        </v-col>
        <v-col class="my-2" cols="12" md="12" lg="12" xs="12">
          <v-text-field
            v-model="deliveryFormData.phonenumber"
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="Phone Number"
            :rules="[rules.required, rules.phone]"
          ></v-text-field>
        </v-col>
        <v-col class="my-2" cols="12" md="12" lg="12" xs="12">
          <v-text-field
            v-model="deliveryFormData.address"
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="Address"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col class="my-2" cols="12" md="12" lg="12" xs="12">
          <v-text-field
            v-model="deliveryFormData.address2"
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="Address 2"
          ></v-text-field>
        </v-col>
        <v-col class="my-2" cols="12" md="6" lg="6" xs="6">
          <v-text-field
            v-model="deliveryFormData.city"
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="City"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col class="my-2" cols="12" md="6" lg="6" xs="6">
          <v-text-field
            v-model="deliveryFormData.state"
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="State"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col class="my-2" cols="12" md="12" lg="12" xs="12">
          <v-text-field
            v-model="deliveryFormData.zipcode"
            hide-details="auto"
            class="catering-text-field ml-4"
            placeholder="ZIP Code"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import EventBus from "@/eventBus";

export default {
  name: "deliveryform",
  data() {
    return {
      valid: false,
      deliveryFormData: {
        firstname: '',
        lastname: '',
        businessname: '',
        email: '',
        phonenumber: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zipcode: ''
      },
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
        phone: value => {
          const pattern = /^\d{13}$/;
          return pattern.test(value) || 'Invalid phone number';
        }
      }
    };
  },
  watch: {
    deliveryFormData: {
      deep: true,
      handler(newValue) {
        if (this.areAllFieldsFilled(newValue)) {
          this.$emit('delivery-form-data', newValue);
          EventBus.$emit('show-snackbar', {
            message: 'Thank you for filling delivery information',
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
.delivery-form-container {
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
