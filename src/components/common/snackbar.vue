<template>
  <v-snackbar
    width="450px"
    right
    v-model="visible"
    :color="color"
    :timeout="timeout"
    top
  >
    <v-icon class="me-2">{{ icon }}</v-icon>
    {{ message }}
    <v-btn class="float-end" color="white" icon @click="visible = false"
      ><v-icon>mdi-close</v-icon></v-btn
    >
  </v-snackbar>
</template>


<script>
import EventBus from "@/eventBus";

export default {
  data() {
    return {
      visible: false,
      message: "",
      color: "",
      icon: "",
      timeout: 6000,
    };
  },
  mounted() {
    console.log("EventBus:", EventBus);
    EventBus.$on("show-snackbar", (data) => {
      this.showSnackbar(data.message, data.type);
    });
  },
  methods: {
    showSnackbar(message, type) {
      this.message = message;
      this.color = this.getColor(type);
      this.icon = this.getIcon(type);
      this.visible = true;
    },
    getColor(type) {
      switch (type) {
        case "success":
          return "green";
        case "error":
          return "red";
        case "warning":
          return "orange";
        case "info":
          return "blue";
        default:
          return "grey";
      }
    },
    getIcon(type) {
      switch (type) {
        case "success":
          return "mdi-check-circle";
        case "error":
          return "mdi-alert-circle";
        case "warning":
          return "mdi-alert";
        case "info":
          return "mdi-information";
        default:
          return "mdi-information";
      }
    },
  },
  beforeDestroy() {
    EventBus.$off("show-snackbar", this.showSnackbar);
  },
};

</script>

<style scoped>
.v-snackbar {
  border-radius: 4px;
}
</style>
