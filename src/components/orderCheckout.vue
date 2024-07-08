<template>
  <v-card class="card-container-order-checkout">
    <!-- <v-card-title class="checkout-card-title">
        <span class="mx-auto"> Your Cart ({{ cartItems.length }}) </span>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeCart">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title> -->
    <v-divider></v-divider>
    <v-card-text :class="{ 'order-cart-sticky-inner-container': cartItems.length >= 1 }" v-if="cartItems.length">
      <v-expansion-panels v-model="expandedPanels" class="order-summary-main-container">
        <v-expansion-panel class="order-summary-panel" elevation="0" tile>
          <v-expansion-panel-header>
            <v-icon left>mdi-cart</v-icon>
            <h2 class="my-2">Order Summary</h2>
            <v-row no-gutters>
              <v-col cols="12">
                <v-icon right dark>mdi-chevron-down</v-icon>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row v-for="item in cartItems" :key="item.id" class="my-4">
              <v-col cols="4">
                <v-img :src="item.image" class="order-cart-image"></v-img>
              </v-col>
              <v-col cols="8">
                <div>
                  <div class="d-flex justify-space-between">
                    <h3 class="item-title">{{ item.name }}</h3>
                    <v-btn icon @click="removeItem(item.id)">
                      <v-img contain :width="20" :height="20" :src="require('@/assets/delete-icon.svg')"></v-img>
                    </v-btn>
                  </div>
                  <p class="item-price">{{ item.canShowProductsWithChecboxes ? `${item.size}″ - $${item.price}` :
      `$${item.price} / ${item.weight}` }}</p>
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
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-card-text>
    <div class="d-flex justify-center align-center h-75 my-auto flex-column" v-else>
      <v-img :src="require('@/assets/empty-cart.svg')" width="100%" class="order-cart-image"></v-img>
      <p class="empty-cart-text">Your Cart Is Currently Empty!</p>
    </div>
    <v-divider></v-divider>
    <!-- :class="{ 'order-subtotal-sticky-container': cartItems.length >= 1 }" -->
    <v-card-text>
      <v-row>
        <v-row class="px-5" v-if="cartItems.length">
          <v-col cols="12" class="mt-4 pa-0">
            <h2 class="my-2">Add a tip</h2>
            <div class="d-flex justify-space-between my-4">
              <v-btn v-for="option in tipOptions" :key="option.percentage"
                :class="{ 'selected-tip': selectedTip === option.percentage }" @click="selectTip(option.percentage)"
                outlined class="tip-btn-checkout">
                {{ option.percentage > 0 ? option.percentage + '%' : 'Other' }}
              </v-btn>
            </div>
            <v-text-field
              v-if="selectedTip === 0"
              v-model.number="customTipAmount"
              label="Enter custom tip amount"
              type="number"
              min="0"
              class="mt-2"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="mt-4 pa-0">
            <h2 class="my-2">Tax Exempt</h2>
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
            <div class="my-2" v-if="taxExempt && canShowTaxExampt">
              <div class="d-flex">
                <v-text-field class="catering-text-field tax-exampt-field ml-4"
                  placeholder="Upload Tax Exempt Form Here" readonly v-model="fileName"
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
        <v-col cols="12" class="my-4 py-0">
          <h2>Order Total</h2>
        </v-col>
        <v-col cols="12">
          <div class="d-flex justify-space-between">
            <span>Subtotal</span>
            <span>$ {{ subtotal.toFixed(2) }}</span>
          </div>
        </v-col>
        <v-col cols="12">
          <!-- v-if="!taxExempt || !taxExemptFormUploaded" -->
          <div class="d-flex justify-space-between">
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
            <h4>Estimated Total</h4>
            <h4>$ {{ totalWithTip.toFixed(2) }}</h4>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
// import { loadStripe } from "@stripe/stripe-js";
import EventBus from "@/eventBus";

export default {
  data() {
    return {
      selectedTip: 10,
      expandedPanels: 0,
      customTipAmount: 0,
      taxExempt: false,
      canShowTaxExampt: false,
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
      return this.taxExemptFormUploaded ? 0 : this.subtotal * 0.0825;
    },
    tipAmount() {
      if (this.selectedTip === 0) {
        return this.customTipAmount;
      }
      return (
        (this.subtotal +
          (this.taxExempt && this.taxExemptFormUploaded ? 0 : this.tax)) *
        (this.selectedTip / 100)
      );
    },
    total() {
      return this.subtotal + (this.taxExempt && this.taxExemptFormUploaded ? 0 : this.tax);
    },
    totalWithTip() {
      return this.total + this.tipAmount;
    },
  },
  watch: {
    cartItems: {
      deep: true,
      handler(cartItem) {
        console.log('cartItem', cartItem.length)
        if (cartItem.length >= 3) {
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
      console.log('percentage', percentage)
      this.selectedTip = percentage;
    },
    selectTaxExempt(value) {
      this.taxExempt = value;
      this.canShowTaxExampt = value
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
            this.canShowTaxExampt = false
            this.tax = 0
            this.taxExemptFormUploaded = true;
          }
        }, 100);
      }
    },
    gotToCheckout() {
      let checkoutData = {
        cartItems: this.cartItems,
        tipAmount: this.tipAmount,
        tax: this.taxExempt && this.taxExemptFormUploaded ? 0 : this.tax,
      }
      this.$router.push({ name: 'Checkout', params: { checkoutData: checkoutData } })
      this.$emit('move-to-delivery-module', checkoutData)
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
.order-summary-main-container.v-expansion-panels.v-item-group {
  .order-summary-panel.v-expansion-panel::before {
    box-shadow: none !important;
    // box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
  }
}

.order-cart-sticky-inner-container {
  height: 250px !important;
  overflow: auto !important;
}

.order-subtotal-sticky-container {
  height: 300px !important;
  overflow: auto !important;
}

.order-cart-image {
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

.card-container-order-checkout.v-card {
  // height: 500px;
  // overflow: auto;
  margin-top: -12px !important;
  border-radius: 22px !important;
  box-shadow: 0 0 10px 0 rgba(0, 0,
      0, 0.1) !important;
  border: none !important;

  .v-card__title.checkout-card-title {
    background-color: #f6f0ed !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    text-align: center !important;
    font-family: poppins !important;
  }
}

.v-text-field.tax-exampt-field.catering-text-field {
  border: none !important;
  border-radius: 6px !important;
  height: 10px !important;
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