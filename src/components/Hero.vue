<template>
  <v-container class="hero-container" fluid>
    <v-row>
      <v-col cols="12" md="6" class="pt-16 mt-16">
        <div class="mx-10">
          <h1 class="hero-title">Serving Fresh Mediterranean Flavors</h1>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.hero-title {
  font-size: 80px !important;
  font-family: Poppins, sans-serif !important;
  font-weight: 800 !important;
  margin-bottom: 16px;
  color: white !important;

  @media (max-width: 600px) {
    font-size: 40px !important;
    font-weight: 600 !important;
  }
}

.hero-container {
  position: relative;
  background: url(../assets/banner/herobg.webp) no-repeat center center;
  background-size: cover;
  height: 625px;

  @media (max-width: 600px) {
    height: 400px;
  }
}

.hero-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.hero-container > * {
  position: relative;
  z-index: 2;
}
</style>