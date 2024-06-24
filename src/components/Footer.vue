<template>
  <v-footer class="footer">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <h3 class="footer-title">Main Course</h3>
          <ul class="footer-list">
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/locations">Locations</router-link></li>
            <li><router-link to="/order">Order Online</router-link></li>
            <li><router-link to="/menu">Menu</router-link></li>
            <li><router-link to="/press">Press</router-link></li>
          </ul>
        </v-col>
        <v-col cols="12" md="4">
          <h3 class="footer-title">Side Dishes</h3>
          <ul class="footer-list">
            <li><router-link to="/careers">Careers</router-link></li>
            <li><router-link to="/gift-cards">Gift Cards</router-link></li>
          </ul>
        </v-col>
        <v-col cols="12" md="4">
          <h3 class="footer-title">Working Hours</h3>
          <ul class="footer-list">
            <li>MONTOSE</li>
            <li>Mon - Sat: 10:30 AM - 9:00 PM</li>
            <li>Sun: 11:00 AM - 9:00 PM</li>
            <li>GARRON/CIA'S</li>
            <li>Mon - Thu: 10:45 AM - 6:00 PM</li>
            <li>Fri & Sat: 10:00 AM - 6:00 PM</li>
          </ul>
          <h3 class="footer-title">Sign Up For Our Email</h3>
          <v-form>
            <v-text-field label="Email" outlined></v-text-field>
            <v-btn color="orange">Sign Up</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background-color: #231f20;
  color: white;
  padding: 2rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.footer-list {
  list-style: none;
  padding: 0;
}

.footer-list li {
  margin-bottom: 0.5rem;
}

.footer-list a {
  color: white;
  text-decoration: none;
}

.footer-list a:hover {
  text-decoration: underline;
}
</style>
