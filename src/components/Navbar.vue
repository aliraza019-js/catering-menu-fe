<template>
  <div class="header">
    <div class="header-content">
      <router-link to="/" class="logo-link">
        <img
          class="logo"
          alt="Mediterranean Restaurants"
          :src="require('@/assets/logo-black.svg')"
        />
      </router-link>
      <div class="menu ml-10">
        <router-link to="/" class="menu-item">Home</router-link>
        <router-link to="/catering" class="menu-item">Catering</router-link>
        <router-link to="/values" class="menu-item">Our Values</router-link>
        <router-link to="/faq" class="menu-item">FAQ</router-link>
        <router-link to="/locations" class="menu-item">Locations</router-link>
        <router-link to="/contact" class="menu-item">Contact</router-link>
      </div>
      <div class="actions">
        <router-link to="/order" class="order-button">Order Now</router-link>
        <router-link to="/cart" class="cart-icon">
          <v-img width="40px" :src="require('@/assets/cart-icon.jpeg')"></v-img>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
/* General styles */
.header {
  padding: 10px 20px;
  width: 100%;
  background-color: #F6F0ED; /* Light background as per the image */
  border-bottom: 1px solid #ccc; /* Subtle border at the bottom */
  z-index: 999;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  text-decoration: none;
}

.logo {
  width: 100px;
  height: auto;
}

.menu {
  display: flex;
  margin-left: 20px; /* Small margin to the left */
}

.menu-item {
  margin-right: 20px;
  text-decoration: none;
  color: #333; /* Dark color for text */
  font-weight: 500;
  position: relative;
}

.menu-item:hover {
  color: #ff6600; /* Hover color */
}

.actions {
  display: flex;
  align-items: center;
}

.order-button {
  background-color: #E04F00; /* Button color matching the design */
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  margin-right: 20px;
  font-weight: 600;
}

.order-button:hover {
  background-color: #ff5500; /* Slightly darker on hover */
}

.cart-icon {
  color: #ff6600; /* Color of the cart icon */
  font-size: 24px;
}
</style>
