<template>
  <div class="my-4 location-container">
    <v-container class="my-4">
      <v-row>
        <v-col cols="12" class="text-center">
          <h2 class="font-36">Choose pick up location</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <div
            class="location-card"
            :class="{ active: activeLocation === 'montrose' }"
            @click="handleActiveLocation('montrose')"
          >
            <span :class="{'location-number-active' : activeLocation === 'montrose' , 'location-number' : activeLocation != 'montrose'}">1</span>
            <h3 class="text-start">Montrose</h3>
            <div class="compact-list-item">
              <span class="icon">
                <v-icon color="#E04F00">mdi-map-marker</v-icon>
              </span>
              <span class="content">
                912 Westheimer Street Houston, TX 77006
              </span>
            </div>
            <div class="compact-list-item">
              <span class="icon">
                <v-icon color="#E04F00">mdi-clock-time-four</v-icon>
              </span>
              <span class="content">
                Operating Hours
                <div class="ml-8">
                  <span class="subtitle">Thu - Sat: 11:00 AM to 10:00 PM</span>
                  <span class="subtitle ml-4"
                    >Sun - Wed: 11:00 AM to 9:00 PM</span
                  >
                </div>
              </span>
            </div>
            <div class="compact-list-item">
              <span class="icon">
                <v-icon small color="#E04F00">mdi-phone</v-icon>
              </span>
              <span class="content">832-570-4770</span>
            </div>
            <div class="compact-list-item">
              <span class="icon">
                <v-icon color="#E04F00">mdi-email</v-icon>
              </span>
              <span class="content">Catering@AladdinsHouston.com</span>
            </div>
          </div>
          <div
            class="location-card mt-4"
            :class="{ active: activeLocation === 'garden' }"
            @click="handleActiveLocation('garden')"
          >
            <span :class="{'location-number-active' : activeLocation === 'garden' , 'location-number' : activeLocation != 'garden'}">2</span>
            <h3 class="text-start">Garden Oaks</h3>
            <div class="compact-list-item">
              <span class="icon">
                <v-icon class="mt-3" color="#E04F00">mdi-map-marker</v-icon>
              </span>
              <span class="content"> 1737 W 34th St., Houston, TX 77018 </span>
            </div>
            <div class="compact-list-item">
              <span class="icon">
                <v-icon color="#E04F00">mdi-clock-time-four</v-icon>
              </span>
              <span class="content">
                Operating Hours
                <div class="ml-8">
                  <div class="subtitle">Sat: 11:00 AM to 9:00 PM</div>
                  <div class="subtitle">Mon - Fri: 11:00 AM to 9:00 PM</div>
                  <div class="subtitle">Sun: 11:00 AM to 8:00 PM</div>
                </div>
              </span>
            </div>
            <div class="compact-list-item">
              <span class="icon">
                <v-icon color="#E04F00">mdi-phone</v-icon>
              </span>
              <span class="content">(713) 942-2321</span>
            </div>
            <div class="compact-list-item">
              <span class="icon">
                <v-icon color="#E04F00">mdi-email</v-icon>
              </span>
              <span class="content">Catering@AladdinsHouston.com</span>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <!-- {{ activeLocation }} -->
          <!-- src/assets/montrose-map.png -->
          <v-img
            :src="
              activeLocation == 'montrose'
                ? require(`@/assets/montrose-map.png`)
                : require(`@/assets/garden-map.png`)
            "
            alt="Location Map"
            width="100%"
            height="100%"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeLocation: "montrose",
    };
  },
  methods: {
    handleActiveLocation(activelocation){
      this.activeLocation = activelocation;
      this.$emit('active-location', this.activeLocation)
    }
  }
};
</script>

<style scoped>
.icon {
  margin-right: 8px;
}
.content {
  font-size: 12px !important;
  font-weight: 400 !important;
  font-family: Poppins !important;
}
.font-36 {
  font-size: 36px;
  font-weight: bold;
}
.location-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #FFFFFF !important;
  padding: 16px;
  cursor: pointer;
  margin-bottom: 16px !important;
  height: 250px !important;
  position: relative;
  transition: all 0.3s ease;
}
.location-card h3 {
  font-size: 24px;
  margin-bottom: 8px;
}
.location-number {
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #E04F00;
  opacity: 17% !important;
  color: #fff;
  border-radius: 50%;
  padding: 8px 16px;
  font-weight: bold;
}
.location-number-active {
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #e04f00;
  color: #fff;
  border-radius: 50%;
  padding: 8px 16px;
  font-weight: bold;
}
.location-container {
  background-color: #f9e0d4 !important;
}
.location-card.active {
  border-color: #e04f00;
  border: 2px solid #e04f00;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.compact-list-item {
  /* margin: 10px 4px !important; */
  text-align: start !important;
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>
