<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <Hero v-once/>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="$vuetify.breakpoint.mdAndUp ? 8 : 12">
        <Menu v-if="menuVisible" />
      </v-col>
      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="4">
        <div class="sticky-wrapper">
          <CheckoutCart v-if="checkoutCartVisible" @move-to-delivery-module="moveToDelivery($event)" />
        </div>
      </v-col>
    </v-row>
    <!-- Floating Action Button for mobile view -->
    <!-- <v-badge v-show="$vuetify.breakpoint.smAndDown" :content="cartItemCount" color="white" overlap>
      <v-btn v-once class="checkout-fab" color="primary" dark fab bottom right @click="checkoutDialog = true">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-badge> -->

    <!-- Checkout Dialog -->
    <!-- <v-dialog v-show="checkoutDialog" v-model="checkoutDialog" fullscreen hide-overlay
      transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="checkoutDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Checkout Cart</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="px-0">
          <CheckoutCart @move-to-delivery-module="moveToDelivery($event)" />
        </v-card-text>
      </v-card>
    </v-dialog> -->
  </v-container>
</template>

<script>
import Hero from "../components/Hero";
import Menu from "../components/menu";
import CheckoutCart from "@/components/CheckoutCart";
// const Location = () => import("../components/Location");

export default {
  name: "Home",
  components: {
    Hero,
    Menu,
    CheckoutCart,
  },
  data() {
    return {
      deliveryTotalData: {},
      checkoutDialog: false,
      menuVisible: false,
      checkoutCartVisible: false,
    }
  },
  computed: {
    cartItemCount() {
      return this.$store.getters.cartItems.length;
    }
  },
  mounted() {
    // Load components after initial render
    this.$nextTick(() => {
      this.menuVisible = true;
      this.checkoutCartVisible = true;
    });
  },
  methods: {
    moveToDelivery(data) {
      window.scrollTo({
        top: document.getElementById("delivery-module").offsetTop,
        left: 0,
        behavior: "smooth",
      });
      this.deliveryTotalData = data;
    }
  }
};
</script>

<style>
.sticky-wrapper {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  /* Adjust this value as needed */
}

.checkout-fab {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 9999;
}
</style>
