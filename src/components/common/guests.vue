<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="12" class="text-center">
        <h2 class="title">How many guests?</h2>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6" class="d-flex justify-center">
        <v-select
          v-model="selectedValue"
          :items="guestOptions"
          outlined
          dense
          @change="$emit('number-of-guests', selectedValue)"
          class="guest-dropdown"
          placeholder="Number of guests"
          :menu-props="{ maxHeight: '300px' }"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedValue: null,
      guestOptions: this.generateGuestOptions(),
    };
  },
  methods: {
    generateGuestOptions() {
      let options = [];
      for (let i = 10; i <= 200; i++) {
        options.push(i);
      }
      return options;
    },
  },
};
</script>

<style lang="scss">
.title {
  font-size: 42px !important;
  font-weight: bold !important;
  font-family: poppins !important;
}

.guest-dropdown {
  width: 100%;
}
</style>
