<template>
  <v-card class="card-container-checkout">
    <v-card-title class="checkout-card-title">
      <span class="mx-auto"> Your Cart ({{ cartItems.length }}) </span>
      <v-spacer></v-spacer>
      <!-- <v-btn icon @click="closeCart">
        <v-icon>mdi-close</v-icon>
      </v-btn> -->
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text :class="{ 'cart-sticky-inner-container': cartItems.length >= 1 }" v-if="cartItems.length">
      <v-row v-for="item in cartItems" :key="item.id" class="my-4">
        <v-col cols="4">
          <v-img :src="item.image" class="cart-image"></v-img>
        </v-col>
        <v-col cols="8">
          <div>
            <div class="d-flex justify-space-between">
              <h3 class="item-title">{{ item.name }}</h3>
              <v-btn icon @click="removeItem(item.id)">
                <v-img contain :width="20" :height="20" :src="require('@/assets/delete-icon.svg')"></v-img>
              </v-btn>
            </div>
            <p class="item-price">{{ item.canShowProductsWithChecboxes ? `${item.size}″ - $${item.price}` :  `$${item.price} / ${item.weight}`}}</p>
            <div class="quantity-control d-flex align-center">
              <v-btn icon @click="
                item.quantity === 1
                  ? removeItem(item.id)
                  : decreaseQuantity(item.id)
                ">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <span class="mx-2">{{ item.quantity }}</span>
              <v-btn icon @click="increaseQuantity(item.id)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="item-total-price">
            $ {{ (item.price * item.quantity).toFixed(2) }}
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <div class="d-flex justify-center align-center h-75 my-auto flex-column" v-else>
      <v-img :src="require('@/assets/empty-cart.jpg')" width="100%" class="cart-image"></v-img>
      <p class="empty-cart-text">Your Cart Is Currently Empty!</p>
    </div>
    <v-divider></v-divider>
    <!-- :class="{ 'subtotal-sticky-container': cartItems.length >= 1 }" -->
    <!-- <v-card-text>
      <v-row>
        <v-row class="px-5" v-if="cartItems.length">
          <v-col cols="12" class="mt-4 py-0">
            <h4>Add a tip</h4>
            <div class="d-flex justify-space-between my-4">
              <v-btn v-for="option in tipOptions" :key="option.percentage"
                :class="{ 'selected-tip': selectedTip === option.percentage }" @click="selectTip(option.percentage)"
                outlined class="tip-btn-checkout">
                {{ option.percentage > 0 ? option.percentage + '%' : 'No Tip' }}
              </v-btn>
            </div>
          </v-col> 
          <v-col cols="12" class="mt-4 py-0">
            <h4>Tax Exempt</h4>
            <div class="d-flex justify-space-between my-4">
              <v-btn :class="{ 'selected-tax-exempt': taxExempt === true }" @click="selectTaxExempt(true)" outlined
                class="tax-exempt-btn mx-1">
                Yes
              </v-btn>
              <v-btn :class="{ 'selected-tax-exempt': taxExempt === false }" @click="selectTaxExempt(false)" outlined
                class="tax-exempt-btn">
                No
              </v-btn>
            </div>
            <div class="my-2" v-if="taxExempt">
              <div class="d-flex">
                <v-text-field class="catering-text-field tax-exampt-field ml-4" placeholder="Upload Tax Exempt Form Here" readonly v-model="fileName"
                  hide-details="auto"></v-text-field>
                <v-btn class="file-input-btn" @click="triggerFileInput">
                  Upload
                </v-btn>
              </div>
              <input type="file" ref="fileInput" @change="handleFileUpload" class="d-none" />
              <v-progress-linear v-if="uploadPercentage > 0" :value="uploadPercentage" class="my-2"></v-progress-linear>
              <span v-if="uploadPercentage > 0">{{ uploadPercentage }}%</span>
            </div>
          </v-col>
        </v-row>
        <v-col cols="12">
          <div class="d-flex justify-space-between">
            <span>Subtotal</span>
            <span>$ {{ subtotal.toFixed(2) }}</span>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="d-flex justify-space-between" v-if="!taxExempt || !taxExemptFormUploaded">
            <span>Estimated Tax</span>
            <span>$ {{ tax.toFixed(2) }}</span>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="d-flex justify-space-between">
            <span>Tip</span>
            <span>$ {{ tipAmount.toFixed(2) }}</span>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="d-flex justify-space-between">
            <h3>Estimated Total</h3>
            <h3>$ {{ totalWithTip.toFixed(2) }}</h3>
          </div>
        </v-col>
      </v-row>
    </v-card-text> -->
    <v-card-actions>
      <!-- Subtotal -->
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-space-between">
            <span>Subtotal</span>
            <span>$ {{ subtotal.toFixed(2) }}</span>
          </div>
        </v-col>
        <v-col cols="12">
          <!-- Checkout button -->
          <v-btn block color="#fe734a" :disabled="!cartItems.length" class="checkout-button my-4" @click="gotToCheckout">
            Go to Checkout
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
// import { loadStripe } from "@stripe/stripe-js";
import EventBus from "@/eventBus";

export default {
  data() {
    return {
      selectedTip: 0,
      taxExempt: false,
      taxExemptFormUploaded: false,
      uploadPercentage: 0,
      fileName: '',
      tipOptions: [
        { percentage: 20 },
        { percentage: 15 },
        { percentage: 10 },
        { percentage: 0 },

      ],
    };
  },
  computed: {
    ...mapState(["cartItems"]),
    ...mapGetters(["cartSubtotal"]),
    subtotal() {
      return this.cartSubtotal;
    },
    tax() {
      return this.subtotal * 0.0825;
    },
    tipAmount() {
      return (this.subtotal + (this.taxExempt && this.taxExemptFormUploaded ? 0 : this.tax)) * (this.selectedTip / 100);
    },
    total() {
      return this.subtotal + (this.taxExempt && this.taxExemptFormUploaded ? 0 : this.tax);
    },
    totalWithTip() {
      return this.total + this.tipAmount;
    },
  },
  watch: {
    cartItems : {
      deep: true,
      handler(cartItem) {
        console.log('cartItem', cartItem.length)
        if(cartItem.length >= 3){
          EventBus.$emit('show-snackbar', {
          message: `Please Scroll down to see more products`,
          type: 'info'
        });
        }
      }
    }
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity", "removeItem"]),
    closeCart() {
      // Implement cart closing logic
    },
    formatPrice(item) {
      console.log('item formatPrice', item)
      return `${item.size} - $${item.price.toFixed(2)}`;
      // return price;
    },
    selectTip(percentage) {
      this.selectedTip = percentage;
    },
    selectTaxExempt(value) {
      this.taxExempt = value;
      if (!value) {
        this.taxExemptFormUploaded = false;
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.fileName = file.name;
        // Simulate file upload process
        this.uploadPercentage = 0;
        const interval = setInterval(() => {
          this.uploadPercentage += 10;
          if (this.uploadPercentage >= 100) {
            clearInterval(interval);
            this.taxExemptFormUploaded = true;
          }
        }, 100);
      }
    },
    gotToCheckout(){
      let checkoutData = {
        cartItems: this.cartItems,
        tipAmount: this.tipAmount,
        tax: this.taxExempt && this.taxExemptFormUploaded ? 0 : this.tax,
      }
      this.$router.push({name: 'Checkout', params: {checkoutData: checkoutData}})
      // this.$emit('move-to-delivery-module', checkoutData)
    },
    // async handleCheckout() {
    //   const stripe = await loadStripe(
    //     "pk_live_51ONQenBDz9FsjJ0OwKgMxvMN3CNFHXVaKprYcAMeUOpZ8qZwqOCWsgXVmIPJqAHdbZpzZM6utUlLVDKQp58saieA00tgVPvMUJ"
    //   );

    //   // Create the checkout session on your backend
    //   const response = await fetch(
    //     "http://localhost:3000/create-checkout-session",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ 
    //         items: this.cartItems,
    //         tipAmount: this.tipAmount,
    //         tax: this.taxExempt && this.taxExemptFormUploaded ? 0 : this.tax,
    //       }),
    //     }
    //   );

    //   const session = await response.json();

    //   // Redirect to Stripe Checkout
    //   const result = await stripe.redirectToCheckout({
    //     sessionId: session.id,
    //   });

    //   if (result.error) {
    //     console.error("ERROR", result.error.message);
    //   }
    // },
  },
};
</script>

<style lang="scss">
.cart-sticky-inner-container {
  height: 550px !important;
  overflow: auto !important;
}

.subtotal-sticky-container{
  height: 200px !important;
  overflow: auto !important;
}

.cart-image {
  max-width: 100px;
  max-height: 100px;
}

.item-title {
  font-weight: 600 !important;
  font-size: 16px !important;
  font-family: poppins !important;
  color: #2d2821 !important;
}

.item-price {
  font-size: 12px !important;
  font-family: poppins !important;
  font-weight: 400 !important;
  color: #2d2821 !important;
  margin-top: 4px !important;
}

.quantity-control {
  margin-top: 10px;
}

.item-total-price {
  text-align: right;
  font-weight: bold;
}

.total-row {
  border-top: 1px solid #ccc;
  padding-top: 10px;
}

.empty-cart-text {
  font-size: 22px !important;
  font-weight: 600;
  margin-bottom: 2rem;
}

.checkout-button.v-btn {
  color: white;
  font-weight: bold;
  height: 54px !important;
  border-radius: 8px !important;
  bottom: 0 !important;
  width: 100% !important;
}

.checkout-button.v-btn .v-btn__content {
  text-transform: capitalize !important;
  letter-spacing: 0px !important;
  font-family: poppins !important;
  font-size: 14px !important;
  font-weight: 500 !important;
}

.card-container-checkout.v-card {
  height: 100vh;
  border-radius: 8px !important;

  .v-card__title.checkout-card-title {
    background-color: #f6f0ed !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    text-align: center !important;
    font-family: poppins !important;
  }
}

.v-text-field.tax-exampt-field.catering-text-field{
  border: 1px solid #fe734a !important;
  border-radius: 6px !important;
  height: 50px !important;
}

.v-btn.tip-btn-checkout {
  @media screen and (max-width: 600px) {
    width: 23% !important;
  }
  background-color: white !important;
  color: #333 !important;
  border: 1px solid #fe734a !important;
  border-radius: 6px !important;
  width: 100px !important;
}

.v-btn.tax-exempt-btn {
  @media screen and (max-width: 600px) {
    width: 150px !important;
  }
  background-color: white !important;
  color: #333 !important;
  border: 1px solid #fe734a !important;
  border-radius: 6px !important;
  width: 200px !important;
}

.v-btn.selected-tip,
.v-btn.selected-tax-exempt {
  background-color: #fe734a !important;
  color: white !important;
}

.file-input-btn {
  background-color: #fe734a !important;
  color: white !important;
  font-family: poppins !important;
  text-transform: capitalize !important;
  letter-spacing: 0 !important;
  margin-top: 10px !important;
}

.d-none {
  display: none !important;
}

.v-progress-linear {
  height: 4px !important;
}
</style>
