<template>
  <div class="header">
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              <router-link to="/" class="logo-link">
                <img
                  class="logo"
                  alt="Mediterranean Restaurants"
                  :src="require('@/assets/logo-black.svg')"
                />
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="item in menuItems" :key="item.text">
          <router-link :to="item.link" class="menu-item">
            {{ item.text }}
          </router-link>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <router-link to="/order" class="order-button">Order Now</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/contact" class="menu-item">Contact</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div class="header-content desktop-menu">
      <router-link to="/" class="logo-link">
        <img
          class="logo"
          alt="Mediterranean Restaurants"
          :src="require('@/assets/logo-black.svg')"
        />
      </router-link>
      <div class="menu" :class="{ open: isMenuOpen }">
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
        <div class="hamburger" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      menuItems: [
        { text: 'Home', link: '/' },
        { text: 'Catering', link: '/catering' },
        { text: 'Our Values', link: '/values' },
        { text: 'FAQ', link: '/faq' },
        { text: 'Locations', link: '/locations' },
      ],
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },

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

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.hamburger span {
  background: #333;
  border-radius: 2px;
  display: block;
  height: 3px;
  margin: 5px;
  width: 25px;
}

.desktop-menu {
  display: flex;
  align-items: center;
}

.mobile-menu {
  display: none;
}

@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }
  .mobile-menu {
    display: flex;
  }

}
</style>
