<script>
// components
import InputComponent from '@/components/Inputs/InputComponent.vue';
import CountriesList from '@/components/Lists/CountriesList.vue';

// api
import CountriesApi from '@/api/countries';

// libs
import { debounce, delay } from 'lodash';

// interfaces
import Country from '@/interfaces/country';

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
        // отображение списка когда отключился лоадер и нет ошибки
        isLoadDataMessage() {
            return !this.loader && !this.loadDataMessage ? false : true;
        }
    },
    methods: {
        // обработчик ввода в инпут поиска
        changeValueInput(newValue) {
            this.searchQuery = newValue;
        },
        // получение стран(ы) с дебаунсом в 700мс
        async getCountry() {
            this.loadDataMessage = '';
            this.loader = true;

            try {
                const countryData = await CountriesApi.getCountries({ name: this.searchQuery.toLowerCase() });

                if (!countryData.data.length) {
                    delay(() => this.loadDataMessage = 'Ничего не найдено', 300);
                } else
                    this.countriesListData = countryData.data.map(country => {
                        return new Country(country);
                    });

                delay(() => this.loader = false, 300);
            } catch (error) {
                this.loadDataMessage = 'Произошла ошибка, попробуйте позднее';

                delay(() => this.loader = false, 300);
            }
        },
        // получение стран при открытии страницы
        async getCountries() {
            try {
                const countriesData = await CountriesApi.getCountries();
                this.countriesListData = countriesData.data.map(country => {
                    return new Country(country);
                });

                delay(() => this.loader = false, 300);
            } catch (error) {
                this.loadDataMessage = 'Произошла ошибка, попробуйте позднее'

                delay(() => this.loader = false, 300);
            }
        }
    },
    watch: {
        // вотч на изменение инпута поиска
        async searchQuery() {
            await this.debounceSearch();
        }
    },
    // хук ж.ц.
    async created() {
        await this.getCountries();
        this.debounceSearch = debounce(this.getCountry, 700);
    }
}
</script>

<template>
    <div class="home">
        <div class="home__search-wrapper">
            <InputComponent :model-value="searchQuery" @update:model-value="changeValueInput"
                placeholder="Search for a country…" :disabled="loader" class="home__search" />
        </div>
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
        margin-top: 150px;
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

@media (min-width: 1440px) {
    .home {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 80px;

        &__search {
            height: 56px;
            max-width: 480px;
            margin-bottom: 48px;

            &-wrapper {
                width: 1280px;
            }

            .input__input {
                font-size: 14px;
                background: no-repeat 32px 19px / 18px 18px url('../assets/img/search.svg'), transparent;

                &_disabled {
                    background: no-repeat 32px 19px / 18px 18px url('../assets/img/search.svg'), #dddddd;
                }
            }
        }
    }
}
</style>
