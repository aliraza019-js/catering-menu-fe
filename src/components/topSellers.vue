<template>
  <v-container class="my-4">
    <v-row class="my-3">
      <v-col cols="12" class="text-left">
        <h3 class="text-dark-grey font-52">Top Sellers</h3>
      </v-col>
    </v-row>
    <v-carousel cycle hide-delimiters :show-arrows="false">
      <v-carousel-item v-for="(chunk, i) in chunks(items, 3)" :key="i">
        <v-row class="text-center">
          <v-col v-for="(item, j) in chunk" :key="j" cols="4">
            <v-card
              class="mx-auto top-sellers-card"
              max-width="416px"
              height="488px"
              elevation="1"
            >
              <template v-slot:progress>
                <v-progress-linear
                  color="deep-purple"
                  striped
                  rounded
                  height="4"
                ></v-progress-linear>
              </template>

              <v-card-title
                class="font-24 fw-600 d-flex justify-center align-center"
                >{{ item.title }}</v-card-title
              >
              <v-card-text class="text-cente font-14 fw-400r">
                {{ item.description }}
              </v-card-text>

              <v-card-actions class="d-flex justify-center align-center">
                <v-btn color="#2D2821" class="price-btn" text>{{
                  item.price
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Classic Chicken Kabob",
          description:
            "Tender pieces of White meat chicken marinated in traditional Lebanese spices, garlic, onion, and olive oil, then skewered and grilled to perfection.",
          // image: "chicken-kabab",
          price: "$ 6.99",
        },
        {
          title: "Saffron Rice",
          description:
            "A luxurious rice dish infused with saffron and diced veggies known for its vibrant yellowish color and exquisite aroma.",
          // image: "saffran-rice",
          price: "$ 29.99",
        },
        {
          title: "Traditional Hummus",
          description:
            "A creamy dip made from mashed chickpeas (garbanzo), blended with tahini, olive oil, lemon juice, salt, and garlic.",
          image: "hummus",
          price: "$ 29.99",
        },
        {
          title: "Falafel Wrap",
          description:
            "Crispy falafel patties wrapped in a warm pita with fresh veggies and a creamy tahini sauce.",
          image: "hummus",
          price: "$ 5.99",
        },
        {
          title: "Baklava",
          description:
            "Layers of filo pastry filled with chopped nuts and sweetened with honey or syrup.",
          // image: "hummus",
          price: "$ 3.99",
        },
        {
          title: "Greek Salad",
          description:
            "A fresh salad with tomatoes, cucumbers, olives, and feta cheese, dressed with olive oil and oregano.",
          // image: "hummus",
          price: "$ 7.99",
        },
      ],
    };
  },
  methods: {
    chunks(array, size) {
      console.log("array", array);
      const chunkedArr = [];
      for (let i = 0; i < array.length; i += size) {
        chunkedArr.push(array.slice(i, i + size));
      }
      return chunkedArr;
    },
  },
};
</script>

<style>
.price-btn.v-btn {
  text-align: center !important;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
}

.top-sellers-card.v-card {
  border-radius: 24px !important;
  border: 1px solid #f7f7f8 !important;
  background: #fff !important;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.08) !important;
}
/* Add any custom styles if needed */
</style>
