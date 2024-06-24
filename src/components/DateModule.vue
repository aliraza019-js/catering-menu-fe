<template>
  <v-container class="my-4">
    <v-row>
      <v-col cols="12" class="text-center">
        <h2 class="font-36">Choose a pick up date & time.</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" class="d-flex justify-center">
        <v-date-picker v-model="date" :min="minDate" :current="currentMonth" color="#E04F00"
          @input="handleDataAndTime(date, time)" :width="500" class="calendar-style hide-header"
          locale="en"></v-date-picker>
      </v-col>
      <v-col cols="4">
        <div class="time-picker-container">
          <label for="time-picker" class="time-picker-label">Select a time</label>
          <v-select v-model="time" :items="times" prepend-inner-icon="mdi-clock-outline" dense
            @input="handleDataAndTime(date, time)" outlined hide-details class="time-picker"></v-select>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventBus from "@/eventBus";
export default {
  data() {
    return {
      date: null,
      time: "10:00 AM",
      times: [
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
        "06:00 PM",
        "07:00 PM",
        "08:00 PM",
        "09:00 PM",
      ],
      minDate: new Date().toISOString().substr(0, 10),
      currentMonth: new Date().toISOString().substr(0, 7),
    };
  },
  methods: {
    handleDataAndTime(date, time) {
      console.log('handleDataAndTime', date, time);
      let dateAndTime = {
        date: date,
        time: time
      }
      EventBus.$emit('show-snackbar', {
        message: `You have selected ${this.date} at ${this.time} for order`,
        type: 'info'
      });
      this.$emit('get-date-and-time', dateAndTime)
    },
  },
};
</script>

<style lang="scss">
.font-36 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.calendar-style {
  width: 100%;
  max-width: 600px;
}

.time-picker-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #e04f00 !important;
}

.time-picker-label {
  font-weight: bold;
  margin-bottom: 8px;
}

.time-picker {
  width: 250px;
}

.order-btn.v-btn {
  background-color: #e04f00 !important;
  color: #fff !important;
}

/* Hide the selected date on top */
.hide-header .v-picker__title {
  display: none !important;
}
</style>
