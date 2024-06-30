<template>
  <v-container class="my-4">
    <v-row class="my-3">
      <v-col cols="12" md="6" class="text-left">
        <h3 class="text-dark-grey font-40">Catering Menu</h3>
        <p class="text-dark-grey mt-5 font-20">* The minimum orders for catering is 250$</p>
      </v-col>
      <v-col cols="12" md="6" class="text-right">
        <v-text-field v-model="searchMenu" label="Search" append-icon="mdi-magnify" class="search-menu"
          @click:append="performSearch" solo></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="productsLoader" class="h-100 d-flex" justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <v-img src="@/assets/not-found.png" class="not-found-icon mx-auto"></v-img>
        <h1 class="not-found-title">Not Found</h1>
      </v-col>
    </v-row>
    <!-- Item Cards Grouped by Category -->
    <v-row v-else v-for="(items, category) in groupedItemsByCategory" :key="category">
      <v-col cols="12">
        <h1 class="category-title">{{ category }}</h1>
      </v-col>
      <v-col cols="12" md="6" v-for="item in items" :key="item.name" class="d-flex">
        <v-card :class="{
          'custom-card-with-checkboxes':
            !categoriesWithoutCheckboxes.includes(category),
          'custom-card-without-checkboxes':
            categoriesWithoutCheckboxes.includes(category),
        }" class="custom-card" outlined>
          <v-row>
            <v-col cols="12" md="4">
              <v-img :src="item.image" class="custom-image" width="500px" contain></v-img>
            </v-col>
            <v-col cols="12" md="8" :class="{ 'align-center': $vuetify.breakpoint.smAndDown }"
              class="d-flex flex-column justify-center">
              <v-card-title class="menu-title">{{ item.name }}</v-card-title>
              <v-card-subtitle v-if="categoriesWithoutCheckboxes.includes(category)" class="menu-price py-1">$
                {{
          shouldDisplayDzn(item)
            ? formatPrice(item.price) + "/Dzn"
            : shouldDisplayWithKabab(item) ? formatPrice(item.price) + '/Kabob' : formatPrice(item.price)
        }}</v-card-subtitle>
              <v-radio-group v-else v-model="selectedPrice[item?.id]" class="menu-radio-container flex-wrap ml-2" row>
                <v-radio v-for="(priceOption, index) in prices" :key="index" class="menu-radio-item"
                  :label="`${priceOption.size} - $${priceOption.unit_amount}`" :value="priceOption.unit_amount"
                  hide-details="auto"></v-radio>
              </v-radio-group>
              <v-card-actions>
                <v-btn @click="handleAddToCart(item, category)" class="add-to-cart-btn mt-2" color="#EB5605">
                  Add to Cart
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EventBus from "@/eventBus";

export default {
  data() {
    return {
      searchMenu: "",
      selectedCategory: "Menu",
      productsLoader: false,
      categoriesWithoutCheckboxes: ["appetizers", "meats"],
      productsWithDzn: [
        "Grape Leaves",
        "Falafel",
        "Kibbie Balls",
        "Chicken Sambosak",
      ],
      productsWithKabab:[
        "Classic Chicken Kabob",
        "Chipotle chicken kabob",
        "Saffron chicken kabob",
        "Filet Steak Beef Kabob",
        "Kafta Kabob Minced Beef",
        "Filet Lamb Kabob",
        "Shrimp Kabob",
        "Baked Chicken Quarter"
      ],
      selectedPrice: {},
      prices: [
        { size: "12", unit_amount: "39.99" },
        { size: "16", unit_amount: "59.99" },
        { size: "18", unit_amount: "79.99" },
        { size: "24", unit_amount: "99.99" },
      ],
      categories: [
        "Menu",
        "Appetizers",
        "Dips & Pita",
        "Salads",
        "Hot Veggies",
        "Rice",
        "Meats",
        "Specialty Desserts",
        "Drinks",
      ],
      items: [],
    };
  },
  computed: {
    ...mapGetters(["cartItems"]),
    uniqueCategories() {
      return [...new Set(this.filteredItems.map((item) => item.category))];
    },
    filteredItems() {
      if (this.selectedCategory === "Menu" && !this.searchMenu) {
        return this.items;
      }
      if (this.selectedCategory === "Menu" && this.searchMenu) {
        return this.items.filter((item) =>
          item.name.toLowerCase().includes(this.searchMenu.toLowerCase())
        );
      }
      return this.items.filter(
        (item) =>
          item.category === this.selectedCategory &&
          item.name.toLowerCase().includes(this.searchMenu.toLowerCase())
      );
    },
    groupedItemsByCategory() {
      return this.filteredItems.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {});
    },
    getItemQuantity() {
      return (item) => {
        const cartItem = this.cartItems.find(
          (cartItem) => cartItem.id === item.id
        );
        return cartItem ? cartItem.quantity : 0;
      };
    },
  },
  methods: {
    ...mapActions(["addToCart", "increaseQuantity", "decreaseQuantity"]),
    performSearch() {
      console.log("Searching for:", this.searchMenu);
    },
    validateSelection(item, category) {
      if (!this.categoriesWithoutCheckboxes.includes(category) && !this.selectedPrice[item.id]) {
        EventBus.$emit("show-snackbar", {
          message: "Please select a size option",
          type: "error",
        });
        return false;
      }
      return true;
    },
    shouldDisplayDzn(item) {
      return this.productsWithDzn.includes(item.name);
    },
    shouldDisplayWithKabab(item){
      return this.productsWithKabab.includes(item.name);
    },
    formatPrice(price) {
      price = typeof price === "number" ? price.toFixed(2) : price;
      if (price.endsWith(".00")) {
        return price.slice(0, -3); // Remove '.00'
      }
      return price;
    },
    filterCategory(category) {
      this.selectedCategory = category;
    },
    increaseQuantity(item) {
      this.$store.dispatch("increaseQuantity", item);
    },
    decreaseQuantity(item) {
      this.$store.dispatch("decreaseQuantity", item);
    },
    getSize(unitAmount) {
      if (unitAmount === "39.99") return "12";
      if (unitAmount === "59.99") return "16";
      if (unitAmount === "79.99") return "18";
      return "24";
    },
    async handleAddToCart(item, category) {
      if (!this.validateSelection(item, category)) return;

      const newItem = {
        ...item,
        price: this.productsWithDzn.includes(item.name)
          ? item.price
          : this.selectedPrice[item.id]
            ? this.selectedPrice[item.id]
            : item.price,
        size: this.getSize(this.selectedPrice[item.id]),
        canShowProductsWithChecboxes: !this.categoriesWithoutCheckboxes.includes(category),
        weight: this.productsWithDzn.includes(item.name) ? 'Dzn' : this.productsWithKabab.includes(item.name) ? 'Kabab' : '',
      };

      const message = await this.addToCart(newItem);
      if (message === "Already Exist in cart") {
        EventBus.$emit("show-snackbar", {
          message: "Already Exist in cart",
          type: "error",
        });
      } else if (message === "Updated cart item with new size") {
        EventBus.$emit("show-snackbar", {
          message: "Updated cart item with new size",
          type: "success",
        });
      } else if (message === "Added to cart") {
        EventBus.$emit("show-snackbar", {
          message: "Added to cart",
          type: "success",
        });
      }
    },
  },

  async created() {
    this.productsLoader = true
    try {
      const response = await fetch(
        "https://backend.vcaterings.com/api/products?limit=100"
      );
      const products = await response.json();
      console.log("products", products);
      this.items = products.reverse();
      this.productsLoader = false
    } catch (error) {
      this.productsLoader = false
      console.error("Error fetching products:", error);
    }
  },
};
</script>

<style lang="scss">
.custom-card {
  border-radius: 24px !important;
  border: 1px solid #f7f7f8 !important;
  background: #fff !important;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.08) !important;
  position: relative;
}

.custom-card-with-checkboxes {
  height: auto !important;

  @media (min-width: 960px) {
    height: 250px !important;
  }
}

.custom-card-without-checkboxes {
  height: auto !important;

  @media (min-width: 960px) {
    height: 155px !important;
  }
}

.custom-image {
  object-fit: contain !important;
  border-radius: 8px;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  height: 100% !important;
  background-size: contain !important;
}

.v-card.custom-card .v-card__title.menu-title {
  font-weight: bold !important;
  font-size: 20px !important;
  font-family: poppins !important;
  color: #2d2821 !important;
}

.v-card.custom-card .v-card__subtitle.menu-price {
  font-weight: 600 !important;
  font-size: 14px !important;
  font-family: poppins !important;
  color: #2d2821 !important;
}

.category-title {
  font-size: 30px !important;
  font-family: poppins !important;
  font-weight: 700;
  text-transform: capitalize !important;
  color: #2d2821 !important;

  @media (max-width: 600px) {
    font-size: 24px !important;
  }
}

.category-filters {
  margin-top: 20px;
}

.category-filters .v-btn {
  text-transform: none;
  border-radius: 4px;
  border: none;
  background: var(--grey, #f7f7f8);
}

.category-filters .active-category {
  background-color: #4caf50;
  color: white;
}

.not-found-icon {
  width: 250px;
  height: 250px;
  margin-bottom: 1rem;
}

.not-found-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    font-size: 24px;
  }
}

.v-card {
  width: 100%;
}

.add-to-cart-btn.v-btn {
  width: 150px !important;
  height: 30px !important;
  border-radius: 4px !important;
}

.add-to-cart-btn.v-btn .v-btn__content {
  color: white !important;
  font-size: 12px !important;
  text-transform: capitalize !important;
}

.menu-radio-container.v-input--radio-group {
  .v-input__control {
    .v-messages {
      display: none !important;
    }
  }

  .v-input__slot {
    .v-input--radio-group__input {
      @media (max-width: 600px) {
        justify-content: center !important;
      }
    }
  }

  margin-top: 0px !important;

  .v-radio.menu-radio-item {
    background-color: #f9f9f9 !important;
    padding: 2px;
    height: 36px !important;
    width: 121px !important;
    margin-bottom: 4px !important;
    border-radius: 4px !important;

    .v-label {
      font-size: 14px !important;
    }

    .v-input--selection-controls__input {
      margin-right: 0px !important;

      .v-input--selection-controls__ripple {
        display: none !important;
      }

      .v-icon.mdi-radiobox-blank {
        font-size: 14px !important;
        color: #d9d9d9 !important;
      }

      .v-icon.mdi-radiobox-marked {
        font-size: 14px !important;
        color: #e04f00 !important;
      }
    }
  }
}
</style>
