<template>
  <v-container fluid>
    <!-- First Row: Large Title and Image -->
    <v-row>
      <v-col cols="12" md="6" class="hero-left pa-0">
        <div class="hero-content mx-10">
          <h1 class="hero-title">LET'S EAT</h1>
          <p class="hero-description">
            Since 2006, Aladdin's Catering has enriched Houston's events with
            authentic Mediterranean cuisine. Celebrated for our dedication to
            quality and personalized service, we transform any gathering, big or
            small, into a memorable feast. Dive into our diverse menu and let us
            elevate your next event.
          </p>
        </div>
      </v-col>
      <v-col class="pa-0 hero-right-top" cols="12" md="6">
        <v-img
          :src="require('@/assets/banner/hero1.webp')"
          alt="Food Image"
          class="hero-image"
        ></v-img>
      </v-col>
    </v-row>

    <!-- Second Row: Small Image and Big Text -->
    <v-row v-if="$vuetify.breakpoint.mdAndUp">
      <v-col class="pa-0 small-bottom" cols="12" md="4">
        <v-img
          :src="require('@/assets/banner/hero2.webp')"
          alt="Small Food Image"
          class="small-hero-image"
        ></v-img>
      </v-col>
      <v-col cols="12" md="8" class="big-text-container pa-0">
        <div class="marquee">
          <div class="marquee-content">BIG THINK BIG THINK BIG THINK BIG</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HeroBanner",
};
</script>

<style lang="scss">
.hero-left {
  background-color: #ffd700;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 6px solid black;
}

.small-bottom {
  border-left: 6px solid black;
  border-bottom: 6px solid black;
}

.hero-right-top {
  border-right: 6px solid black;
  border-bottom: 6px solid black;
  border-top: 6px solid black;
}

.hero-content {
  text-align: left;
}

.hero-title {
  font-size: 80px !important;
  font-family: Poppins, sans-serif !important;
  font-weight: 300 !important;
  margin-bottom: 16px;
}

.hero-description {
  font-size: 20px !important;
  font-family: Poppins, sans-serif !important;
  font-weight: 300 !important;
}

.hero-image {
  height: 100%;
  object-fit: cover;
}

.small-hero-image {
  height: 100%;
  object-fit: cover;
}

.big-text-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-right: 6px solid black !important;
  border-bottom: 6px solid black !important;
  //   border-top: 6px solid black !important;
  border-left: 6px solid black !important;
//   border: 6px solid black;
}

.marquee {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.marquee-content {
  display: inline-block;
  white-space: nowrap;
  animation: marquee 10s linear infinite;
  font-size: 128px !important;
  font-weight: 200 !important;
  font-family: Poppins, sans-serif !important;
  color: black;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
