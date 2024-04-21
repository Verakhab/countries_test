<script>
// components
import CountryCard from '../Cards/CountryCard.vue';

export default {
    name: 'CountriesList',
    components: { CountryCard },
    data() {
        return {}
    },

    props: {
        cardList: {
            type: Array,
            default() {
                return [];
            },
        }
    }
}
</script>

<template>
    <div class="countries-list">
        <div v-for="card in cardList" :key="card.name" class="countries-list__card-wrapper">
            <CountryCard :card="card" />
        </div>
    </div>
</template>

<style lang="scss">
.countries-list {
    width: 100%;
    padding: 0 40px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>
