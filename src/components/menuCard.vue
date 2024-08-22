<template>
    <v-card :class="cardClass" outlined>
        <v-row>
            <v-col cols="12" md="4">
                <v-img :src="item.image" :srcset="getSrcSet(item.image)" class="custom-image" loading="lazy"
                    contain></v-img>
            </v-col>
            <v-col cols="12" md="8" class="d-flex flex-column justify-center">
                <v-card-title class="menu-title">{{ item.name }}</v-card-title>
                <v-card-subtitle v-if="shouldDisplayDzn(item)" class="menu-price py-1">
                    ${{ formatPrice(item.price) }}/Dzn
                </v-card-subtitle>
                <v-radio-group v-else v-model="selectedPrice" class="menu-radio-container flex-wrap ml-2" row>
                    <v-radio v-for="(priceOption, index) in prices" :key="index" class="menu-radio-item"
                        :label="`${priceOption.size} - $${priceOption.unit_amount}`" :value="priceOption.unit_amount"
                        hide-details="auto"></v-radio>
                </v-radio-group>
                <v-card-actions>
                    <v-btn @click="handleAddToCart" class="add-to-cart-btn mt-2" color="#fe734a">
                        Add to Cart
                    </v-btn>
                </v-card-actions>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        selectedPrice: {
            type: Object,
            required: true,
        },
        prices: {
            type: Array,
            required: true,
        },
        categoriesWithoutCheckboxes: {
            type: Array,
            required: true,
        },
        productsWithDzn: {
            type: Array,
            required: true,
        },
        productsWithKabab: {
            type: Array,
            required: true,
        },
    },
    computed: {
        cardClass() {
            return {
                'custom-card-with-checkboxes': !this.$parent.categoriesWithoutCheckboxes.includes(this.category),
                'custom-card-without-checkboxes': this.$parent.categoriesWithoutCheckboxes.includes(this.category),
            };
        },
    },
    methods: {
        getSrcSet(image) {
            return `${image}?w=300 300w, ${image}?w=600 600w, ${image}?w=1200 1200w`; // Adjust sizes as necessary
        },
        formatPrice(price) {
            return price.toFixed(2).replace(/\.00$/, '');
        },
        handleAddToCart() {
            this.$emit('add-to-cart', this.item, this.category);
        },
        shouldDisplayDzn(item) {
            return this.$parent.productsWithDzn.includes(item.name);
        },
    },
};
</script>

<style scoped>
/* Your MenuCard styles */
</style>