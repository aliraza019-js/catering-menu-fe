<template>
  <v-container class="my-4">
    <template v-once>
      <v-row class="my-3">
        <v-col cols="12" md="6" class="text-left">
          <h3 class="text-dark-grey font-40">Catering Menu</h3>
          <p class="text-dark-grey mt-5 font-20">* The minimum orders for catering is 250$</p>
        </v-col>
        <v-col cols="12" md="6" class="text-right">
          <v-text-field
            v-model="searchMenu"
            label="Search"
            append-icon="mdi-magnify"
            class="search-menu"
            @click:append="performSearch"
            solo
          ></v-text-field>
        </v-col>
      </v-row>
    </template>

    <v-row v-if="productsLoader || !filteredItems.length" class="h-100 d-flex" justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <v-img
          src="@/assets/not-found.webp"
          loading="lazy"
          class="not-found-icon mx-auto"
        ></v-img>
        <h1 class="not-found-title">Not Found</h1>
      </v-col>
    </v-row>

    <v-row v-else v-for="(items, category) in groupedItemsByCategory" :key="category">
      <v-col cols="12">
        <h1 class="category-title">{{ category }}</h1>
      </v-col>

      <div v-if="$vuetify.breakpoint.smAndDown" class="d-flex overflow-x-auto">
        <v-col cols="12" md="6" v-for="item in items" :key="item.name" class="px-2">
          <MenuCard
          :item="item"
          :category="category"
          :selectedPrice.sync="selectedPrice"
          :prices="prices"
          :categoriesWithoutCheckboxes="categoriesWithoutCheckboxes"
          :productsWithDzn="productsWithDzn"
          :productsWithKabab="productsWithKabab"
          @add-to-cart="handleAddToCart"
        />
        </v-col>
      </div>
      
      <v-col v-if="!$vuetify.breakpoint.smAndDown" cols="12" md="6" v-for="item in items" :key="item.name" class="px-2">
        <MenuCard :item="item" :prices="prices" :category="category" @add-to-cart="handleAddToCart" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EventBus from "@/eventBus";
import MenuCard from "@/components/menuCard.vue"; // Import the new MenuCard component

export default {
  components: {
    MenuCard
  },
  data() {
    return {
      searchMenu: "",
      productsLoader: false,
      categoriesWithoutCheckboxes: ["appetizers", "meats"],
      productsWithDzn: [
        "Grape Leaves",
        "Falafel",
        "Kibbie Balls",
        "Chicken Sambosak",
      ],
      productsWithKabab: [
        "Classic Chicken Kabob",
        "Chipotle chicken kabob",
        "Saffron chicken kabob",
        "Filet Steak Beef Kabob",
        "Kafta Kabob Minced Beef",
        "chick kabaab",
        "Beef kabeb",
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
      items: [],
    };
  },
  computed: {
    ...mapGetters(["cartItems"]),
    filteredItems() {
      if (!this.searchMenu) {
        return this.items;
      }
      return this.items.filter((item) =>
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
  },
  methods: {
    ...mapActions(["addToCart"]),
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
    async handleAddToCart(item, category) {
      if (!this.validateSelection(item, category)) return;

      const newItem = {
        ...item,
        price: this.productsWithDzn.includes(item.name)
          ? item.price
          : this.selectedPrice[item.id] || item.price,
        size: this.selectedPrice[item.id] ? this.getSize(this.selectedPrice[item.id]) : undefined,
      };

      const message = await this.addToCart(newItem);
      this.handleCartMessage(message);
    },
    handleCartMessage(message) {
      const messages = {
        "Already Exist in cart": { type: "error" },
        "Added to cart with new size": { type: "success" },
        "Updated cart item with new size": { type: "success" },
        "Added to cart": { type: "success" },
      };
      EventBus.$emit("show-snackbar", { message, type: messages[message]?.type || "info" });
    },
  },
  async created() {
    this.productsLoader = true;
    try {
      const response = await fetch(
        "https://backend.vcaterings.com/api/products?limit=100"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const products = await response.json();
      this.items = products.reverse();
    } catch (error) {
      console.error("Error fetching products:", error.message || error);
    } finally {
      this.productsLoader = false;
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

@media screen and (min-width: 600px) {
  .overflow-x-auto {
    overflow-x: auto;
    white-space: nowrap;
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
        color: #fe734a !important;
      }
    }
  }
}
</style>
