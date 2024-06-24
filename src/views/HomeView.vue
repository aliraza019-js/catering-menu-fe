<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <Hero />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <!-- <Location />
        <TopSellers /> -->
        <Menu />
        <Contactus />
        <Delivery id="delivery-module" :totalAmountData="deliveryTotalData"/>
        <!-- Content goes here -->
      </v-col>
      <v-col cols="4">
        <div class="sticky-wrapper">
          <CheckoutCart @move-to-delivery-module="moveToDelivery($event)"/>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Footer />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Hero from "../components/Hero";
import Location from "../components/Location";
import TopSellers from "../components/topSellers";
import Menu from "../components/menu";
import CheckoutCart from "@/components/CheckoutCart";
import Contactus from "@/components/contactus";
import Delivery from "@/components/DeliveryModule";
import Footer from "@/components/Footer";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",

  components: {
    Hero,
    Location,
    TopSellers,
    Menu,
    CheckoutCart,
    Contactus,
    Delivery,
    Footer,
  },
  data(){
    return{
      deliveryTotalData: {},
    }
  },
  methods: {
    moveToDelivery(data){
      window.scrollTo({
        top: document.getElementById("delivery-module").offsetTop,
        left: 0,
        behavior: "smooth",
      });
      this.deliveryTotalData = data
    }
  }
};
</script>

<style>
.sticky-wrapper {
  position: -webkit-sticky;
  position: sticky;
  top: 0; /* Adjust this value as needed */
}
</style>
