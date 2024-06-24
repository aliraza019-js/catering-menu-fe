// src/store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartItems: [],
  },
  mutations: {
    ADD_TO_CART(state, item) {
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        // this.$root.$emit("show-snackbar", {
        //   message: "Already Exsist in cart",
        //   type: "error",
        // });
        // existingItem.quantity;
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
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        return "Already Exist in cart";
      } else {
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
    cartItems: (state) => {
      console.log("state.state.cartItems", state.cartItems);
      return state.cartItems;
    },
    cartSubtotal: (state) =>
      state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
  },
});
