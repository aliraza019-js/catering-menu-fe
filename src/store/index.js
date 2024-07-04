// src/store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartItems: [],
    categoriesWithoutCheckboxes: ["appetizers", "meats"],
  },
  mutations: {
    ADD_TO_CART(state, item) {
      const existingItemIndex = state.cartItems.findIndex(
        (i) => i.id === item.id && i.size === item.size
      );

      if (existingItemIndex !== -1) {
        // Item with same size already exists
        Vue.set(state.cartItems, existingItemIndex, {
          ...item,
          quantity: state.cartItems[existingItemIndex].quantity + 1,
        });
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    REMOVE_ITEM(state, itemId) {
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    INCREASE_QUANTITY(state, itemId) {
      const item = state.cartItems.find((i) => i.id === itemId);
      if (item) {
        item.quantity += 1;
      }
    },
    DECREASE_QUANTITY(state, itemId) {
      const item = state.cartItems.find((i) => i.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
  actions: {
    addToCart({ commit, state }, item) {
      const categoryWithoutCheckbox = state.categoriesWithoutCheckboxes.includes(item.category);
      const existingItem = state.cartItems.find((i) => i.id === item.id && i.size === item.size);

      if (existingItem) {
        // If the item exists with the same size, show "Already in cart"
        return "Already Exist in cart";
      } else {
        // If the category does not allow multiple sizes, update or add the item
        if (!categoryWithoutCheckbox) {
          commit("ADD_TO_CART", item);
          return "Added to cart with new size";
        }

        // For other categories, add the item normally
        commit("ADD_TO_CART", item);
        return "Added to cart";
      }
    },
    removeItem({ commit }, itemId) {
      commit("REMOVE_ITEM", itemId);
    },
    increaseQuantity({ commit }, itemId) {
      commit("INCREASE_QUANTITY", itemId);
    },
    decreaseQuantity({ commit }, itemId) {
      commit("DECREASE_QUANTITY", itemId);
    },
  },
  getters: {
    cartItems: (state) => state.cartItems,
    cartSubtotal: (state) =>
      state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
  },
});
