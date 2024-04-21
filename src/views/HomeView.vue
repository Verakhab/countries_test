<script>
// components
import InputComponent from '@/components/Inputs/InputComponent.vue';
import CountriesList from '@/components/Lists/CountriesList.vue';

// api
import CountriesApi from '@/api/countries';

// libs
import { debounce, delay } from 'lodash';

export default {
    name: 'HomeView',
    components: { InputComponent, CountriesList },
    data() {
        return {
            loader: true,
            searchQuery: '',
            loadDataMessage: '',
            debounceSearch: null,
            countriesListData: [],
        }
    },
    computed: {
        isLoadDataMessage() {
            return !this.loader && !this.loadDataMessage ? false : true;
        }
    },
    methods: {
        changeValueInput(newValue) {
            this.searchQuery = newValue;
        },
        async getCountry() {
            this.loader = true;
            try {
                const countryData = await CountriesApi.getCountry({ name: this.searchQuery });
                this.countriesListData = countryData.data;
                delay(() => this.loader = false, 300);
            } catch (error) {
                this.loadDataMessage = 'Произошла ошибка, попробуйте позднее'
                delay(() => this.loader = false, 300);
            }
        },
        async getCountries() {
            try {
                const countriesData = await CountriesApi.getCountries();
                this.countriesListData = countriesData.data;
                delay(() => this.loader = false, 300);
            } catch (error) {
                this.loadDataMessage = 'Произошла ошибка, попробуйте позднее'
                delay(() => this.loader = false, 300);
            }
        }
    },
    watch: {
        async searchQuery() {
            await this.debounceSearch();
        }
    },
    async created() {
        await this.getCountries();
        this.debounceSearch = debounce(this.getCountry, 700);
    }
}
</script>

<template>
    <div class="home">
        <InputComponent :model-value="searchQuery" @update:model-value="changeValueInput"
            placeholder="Search for a country…" />
        <CountriesList v-if="!isLoadDataMessage" :cardList="countriesListData" />
        <span v-if="loader" class="home__loader"></span>
        <p v-if="loadDataMessage" class="home__message">{{ loadDataMessage }}</p>
    </div>
</template>

<style lang="scss">
.home {
    padding: 0 15px;

    &__message {
        font-family: 'Nunito Sans';
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        text-align: center;
    }

    &__loader {
        width: 48px;
        height: 48px;
        display: block;
        margin: 150px auto;
        position: relative;
        color: #ccc;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;

        &::after {
            content: '';
            box-sizing: border-box;
            position: absolute;
            width: 24px;
            height: 24px;
            top: 50%;
            left: 50%;
            transform: scale(0.5) translate(0, 0);
            background-color: #ccc;
            border-radius: 50%;
            animation: animloader 1s infinite ease-in-out;
        }

        &::before {
            content: '';
            box-sizing: border-box;
            position: absolute;
            width: 24px;
            height: 24px;
            top: 50%;
            left: 50%;
            transform: scale(0.5) translate(0, 0);
            background-color: #ccc;
            border-radius: 50%;
            animation: animloader 1s infinite ease-in-out;
        }

        &::before {
            background-color: #000;
            transform: scale(0.5) translate(-48px, -48px);
        }
    }
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes animloader {
    50% {
        transform: scale(1) translate(-50%, -50%);
    }
}
</style>
