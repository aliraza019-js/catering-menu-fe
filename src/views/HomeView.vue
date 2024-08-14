<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <Hero />
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="$vuetify.breakpoint.mdAndUp ? 8 : 12">
        <Menu />
      </v-col>
      <v-col v-show="$vuetify.breakpoint.mdAndUp" cols="4">
        <div class="sticky-wrapper">
          <CheckoutCart @move-to-delivery-module="moveToDelivery" />
        </div>
      </v-col>
    </v-row>

    <v-badge v-show="$vuetify.breakpoint.smAndDown" :content="cartItemCount" color="white" overlap>
      <v-btn class="checkout-fab" color="primary" dark fab bottom right @click="checkoutDialog = true">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-badge>

    <v-dialog v-model="checkoutDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="checkoutDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Checkout Cart</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="px-0">
          <CheckoutCart @move-to-delivery-module="moveToDelivery" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
const Hero = () => import("../components/Hero");
const Menu = () => import("../components/menu");
const CheckoutCart = () => import("@/components/CheckoutCart");

export default {
  name: "Home",
  components: {
    Hero,
    Menu,
    CheckoutCart,
  },
  data: () => ({
    checkoutDialog: false,
  }),
  computed: {
    cartItemCount() {
      return this.$store.getters.cartItems.length;
    }
  },
  methods: {
    moveToDelivery() {
      const deliveryModule = document.getElementById("delivery-module");
      if (deliveryModule) {
        deliveryModule.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
};
</script>

<style>
.sticky-wrapper {
  position: sticky;
  top: 0;
}

.checkout-fab {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 9999;
}
</style>