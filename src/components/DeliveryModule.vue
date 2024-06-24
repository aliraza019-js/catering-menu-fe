<template>
  <v-container class="delivery-module" fluid>
    <div>
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h2 class="title">How would you like to get your order?</h2>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="4" class="text-center">
          <v-card :class="{
            'delivery-option-active': isPickupActive,
            'delivery-option': !isPickupActive,
          }" @click="handlePickupSetup">
            <v-card-text>
              <v-img class="mx-auto mt-10" width="70px"
                :src="require(`@/assets/icons/delivery-module/${isPickupActive ? 'pickup-active.svg' : 'pickup-non-active.svg'}`)"></v-img>
            </v-card-text>
          </v-card>
          <h3 class="font-26 fw-600 my-6">Pick Up</h3>
        </v-col>
        <v-col cols="12" md="4" class="text-center">
          <v-card @click="handleDeliverySetup" :class="{
            'delivery-option-active': isDeliveryActive,
            'delivery-option': !isDeliveryActive,
          }">
            <v-card-text>
              <v-img class="mx-auto mt-10" width="80px"
                :src="require(`@/assets/icons/delivery-module/${isDeliveryActive ? 'delivery-active.svg' : 'delivery-non-active.svg'}`)"></v-img>
            </v-card-text>
          </v-card>
          <h3 class="font-26 fw-600 my-6">Deliver to Me</h3>
        </v-col>
      </v-row>
    </div>
    <!-- Subsections in Delivery or Pickup -->
    <div v-if="isPickupActive || isDeliveryActive">
      <!-- Location -->
      <Location @active-location="activeLocation($event)" />
      <Guests @number-of-guests="getNumberOfGuests($event)" />
      <PickupForm @pickup-form-data="handlePickupFormData($event)" v-if="isPickupActive" />
      <DeliveryForm v-if="isDeliveryActive" />
      <DatePIcker @get-date-and-time="handleDateAndTime($event)" />
    </div>
    <v-row v-if="isPickupActive || isDeliveryActive">
      <v-col cols="12" class="d-flex justify-center mt-4">
        <v-btn :loading="loader" class="order-btn" @click="orderNow" :disabled="!isFormComplete">
          <v-icon left>mdi-cart</v-icon> ORDER NOW
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { loadStripe } from "@stripe/stripe-js";
import Location from "./Location.vue";
import DatePIcker from "./DateModule.vue";
import PickupForm from "./forms/pickupform.vue";
import DeliveryForm from "./forms/deliveryform.vue";
import Guests from "./common/guests.vue";
import EventBus from "@/eventBus";

export default {
  name: "DeliveryModule",
  props: {
    totalAmountData: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  components: {
    Location,
    DatePIcker,
    PickupForm,
    DeliveryForm,
    Guests,
  },
  data() {
    return {
      isPickupActive: false,
      isDeliveryActive: false,
      loader: false,
      pickupFormInformation: {
        getOrderBy: 'pickup',
        pickupFormData: {},
        location: '',
        noOfGuests: 0,
        date: '',
        time: ''
      },
      deliveryFormInformation: {
        getOrderBy: 'delivery',
        deliveryFormData: {},
        location: '',
        noOfGuests: 0,
        date: '',
        time: ''
      }
    };
  },
  computed: {
    ...mapState(["cartItems"]),
    isFormComplete() {
      const formInformation = this.isPickupActive ? this.pickupFormInformation : this.deliveryFormInformation;

      const checkAllFields = (obj) => {
        return Object.values(obj).every(value => {
          if (typeof value === 'object' && value !== null) {
            return Object.keys(value).length > 0 && checkAllFields(value); // Check nested object
          }
          return value !== null && value !== ''; // Ensure value is not null or empty string
        });
      };
      return checkAllFields(formInformation);
    }
  },
  watch: {
    pickupFormInformation: {
      handler() {
        this.isFormComplete;
      },
      deep: true
    },
    deliveryFormInformation: {
      handler() {
        this.isFormComplete;
      },
      deep: true
    },
    cartItems: {
      deep: true,
      handler(cartitems){
        if(cartitems.length === 0){
          this.isPickupActive = false
          this.isDeliveryActive = false
        }
      }
    }
  },
  methods: {
    handleDateAndTime(getDateAndTime) {
      if (this.isPickupActive) {
        this.pickupFormInformation.time = getDateAndTime.time;
        this.pickupFormInformation.date = getDateAndTime.date;
      } else {
        this.deliveryFormInformation.time = getDateAndTime.time;
        this.deliveryFormInformation.date = getDateAndTime.date;
      }
    },
    handlePickupFormData(data) {
      this.pickupFormInformation.pickupFormData = { ...data };
    },
    getNumberOfGuests(data) {
      if (this.isPickupActive) {
        this.pickupFormInformation.noOfGuests = data;
      } else {
        this.deliveryFormInformation.noOfGuests = data;
      }
    },
    activeLocation(event) {
      if (this.isPickupActive) {
        this.pickupFormInformation.location = event;
      } else if (this.isDeliveryActive) {
        this.deliveryFormInformation.location = event;
      }
    },
    handleDeliverySetup() {
      if (this.cartItems.length) {
        this.isDeliveryActive = !this.isDeliveryActive;
        this.isPickupActive = false;
      } else {
        EventBus.$emit('show-snackbar', {
          message: `Please add items to cart first`,
          type: 'warning'
        });
      }
    },
    handlePickupSetup() {
      if (this.cartItems.length) {
        this.isPickupActive = !this.isPickupActive;
        this.isDeliveryActive = false;
      } else {
        EventBus.$emit('show-snackbar', {
          message: `Please add items to cart first`,
          type: 'warning'
        });
        // this.$toast.error("Please add items to cart first");
      }
    },
    async orderNow() {
      this.loader = true;
      const stripe = await loadStripe(
        "pk_live_51ONQenBDz9FsjJ0OwKgMxvMN3CNFHXVaKprYcAMeUOpZ8qZwqOCWsgXVmIPJqAHdbZpzZM6utUlLVDKQp58saieA00tgVPvMUJ"
      );

      // Create the checkout session on your backend
      const response = await fetch(
        "http://localhost:3000/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: this.cartItems,
            tipAmount: this.totalAmountData.tipAmount,
            tax: this.totalAmountData.tax,
          }),
        }
      );

      const session = await response.json();
      this.loader = false;
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        this.loader = false;
        console.error("ERROR", result.error.message);
      }
    },
  },
};
</script>

<style scoped>
.delivery-module {
  padding: 2rem 0;
  text-align: center;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.delivery-option-active {
  background-color: #e04f00;
  padding: 1rem;
  border-radius: 20px;
  height: 208px !important;
  width: 500px !important;
}

.delivery-option {
  background-color: #fae1d4;
  /* border: 1px solid #888888 !important; */
  padding: 1rem;
  border-radius: 10px;
  height: 208px !important;
  width: 500px !important;
}

.delivery-option v-icon {
  font-size: 3rem;
  color: #6e6e6e;
}

.delivery-option h3 {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #6e6e6e;
}
</style>
