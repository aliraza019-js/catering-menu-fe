<template>
    <v-container class="checkout-main-container" fluid>
        <v-row>
            <v-col cols="12">
                <div class="checkout-header-container">
                    <div class="left-section">
                        <v-btn class="back-to-store" text @click="goBack"><v-icon left>mdi-arrow-left</v-icon> Back to store</v-btn>
                    </div>
                    <div class="center-section">
                        <img class="logo" alt="Mediterranean Restaurants" :src="require('@/assets/logo-black.svg')" />
                    </div>
                    <div class="right-section"></div>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="custom-card" cols="12" offset="1" md="7">
                <DeliveryModule :totalAmountData="deliveryTotalData"/>
            </v-col>
            <v-col cols="12" md="4">
                <orderCheckout />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import DeliveryModule from '@/components/DeliveryModule.vue';
import orderCheckout from '@/components/orderCheckout.vue';
export default {
    name: 'OrderPage',
    components: {
        DeliveryModule,
        orderCheckout
    },
    data(){
        return{
            deliveryTotalData: {}
        }
    },
    methods: {
        goBack() {
            this.$router.push("/");
        }
    },
    mounted(){
        this.deliveryTotalData = this.$route.params.checkoutData
        console.log('this.$route.params', this.$route.params)
    }
};
</script>

<style lang="scss" scoped>

.checkout-main-container{
    /* height: 100vh !important; */
    background-color: #F6F0ED;
}

.custom-card {
  border-radius: 24px !important;
  border: 1px solid #f7f7f8 !important;
  background: #fff !important;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.08) !important;
  position: relative;
}
/* General styles */
.header {
    padding: 10px 20px;
    width: 100%;
    background-color: #F6F0ED;
    border-bottom: 1px solid #ccc;
    z-index: 999;
}

.header-content {
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
    width: 100px;
    height: auto;
}

.d-flex-checkout {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.left-section,
.right-section {
    margin-left: 75px !important;
    flex: 1;
    display: flex;
    align-items: center;
}

.checkout-header-container {
    display: flex;
    align-items: center;
    background-color: #F6F0ED;
    /* border-bottom: 1px solid #ccc; */
    padding: 10px 20px;
    z-index: 999;
}

.center-section {
    flex: 2;
    display: flex;
    justify-content: center;
}
</style>
