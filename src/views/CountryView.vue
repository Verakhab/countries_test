<script>
// components
import Button from '@/components/Buttons/Button.vue';

// api
import CountriesApi from '@/api/countries';

// libs
import { delay } from 'lodash';

// interfaces
import Country from '@/interfaces/country';

export default {
    name: 'CountryView',
    components: { Button },
    data() {
        return {
            loader: true,
            country: null,
            countryName: '',
            loadDataMessage: '',
            historyCountryView: 0
        }
    },
    methods: {
        // получение данных страны
        async getCountryData() {
            this.loader = true;

            try {
                const countryData = await CountriesApi.getCountries({ name: this.countryName });
                this.country = new Country(countryData.data[0]);

                delay(() => this.loader = false, 300);
            } catch (error) {
                this.loadDataMessage = 'Произошла ошибка, попробуйте позднее';

                delay(() => this.loader = false, 300);
            }
        },
        // получение первогоо слово страны для кнопок, по макету
        getFirstNameBordersCountry(allName) {
            return allName.split(' ')[0];
        },
        // возвращение к предыдущей стране или на страницу домой
        goToHome() {
            if (!this.historyCountryView) {
                this.$router.push('/');
            } else {
                this.historyCountryView--;
                this.$router.go(-1);
            }
        },
        // переход по маршруту выбранной страны
        goToCountry(nameCountry) {
            this.historyCountryView++;
            let routeName = '';

            if (nameCountry.includes('(')) {
                routeName = nameCountry.replace(/[\\(\\)]/g, '');
            }

            routeName ?
                routeName = routeName.toLowerCase().split(' ').join('-') :
                routeName = nameCountry.toLowerCase().split(' ').join('-');

            this.$router.push(routeName);
        }
    },
    computed: {
        // отображение списка когда отключился лоадер и нет ошибки
        isLoadDataMessage() {
            return !this.loader && !this.loadDataMessage ? false : true;
        },
        // отображение разметки мобильной версии
        screenMobile() {
            return document.body.offsetWidth < 1440;
        }
    },
    watch: {
        // вотч на изменение маршрута, подтягиваем данные нужной страны
        async '$route.params.name'(value) {
            this.countryName = value;

            await this.getCountryData();
        }
    },
    // хук ж.ц.
    async created() {
        this.countryName = this.$route.params.name;
        await this.getCountryData();
    }
}
</script>

<template>
    <div class="country">
        <div v-if="!isLoadDataMessage && screenMobile" class="country__content">
            <Button class="country__button" @click="goToHome" :img="true" text="Back" />
            <div class="country__flag-wrapper">
                <img :src="country.flags.png" alt="flag" class="country__flag">
            </div>
            <h1 class="country__title">{{ country.name }}</h1>
            <div class="country__nativeName">
                <span class="country__type">Native Name: </span>{{ country.nativeName }}
            </div>
            <div class="country__population">
                <span class="country__type">Population: </span>{{ country.population }}
            </div>
            <div class="country__region">
                <span class="country__type">Region: </span>{{ country.region }}
            </div>
            <div class="country__subregion">
                <span class="country__type">Sub Region: </span>{{ country.subregion }}
            </div>
            <div class="country__capital">
                <span class="country__type">Capital: </span>{{ country.capital }}
            </div>
            <div class="country__domain">
                <span class="country__type">Top Level Domain: </span>
                <span v-for="(item, index) in country.topLevelDomain" :key="item"
                    class="country__type country__type_other">{{
                        item }}{{
                        index !== country.topLevelDomain.length - 1 ? ', ' : '' }}</span>
            </div>
            <div class="country__currencies">
                <span class="country__type">Currencies: </span>
                <span v-for="(item, index) in country.currencies" :key="item"
                    class="country__type country__type_other">{{ item.code }}{{
                        index !== country.languages.length - 1 ? ', ' : '' }}</span>
            </div>
            <div class="country__languages">
                <span class="country__type">Languages: </span>
                <span v-for="(item, index) in country.languages" :key="item"
                    class="country__type country__type_other">{{ item.name }}{{
                        index !== country.languages.length - 1 ? ', ' : '' }}</span>
            </div>
            <p class="country__border">Border Countries:</p>
            <div class="country__border-button-wrapper">
                <Button v-for="item in country.bordersCountriesName" class="country__button country__border-button"
                    @click="goToCountry(item)" :text="getFirstNameBordersCountry(item)" />
            </div>
        </div>
        <div v-if="!isLoadDataMessage && !screenMobile" class="country__content_desktop">
            <Button class="country__button" @click="goToHome" :img="true" text="Back" />
            <div class="country__flag-wrapper">
                <img :src="country.flags.png" alt="flag" class="country__flag">
            </div>
            <div class="country__description-wrapper">
                <h1 class="country__title">{{ country.name }}</h1>
                <div class="country__description">
                    <div class="country__description_first">
                        <div class="country__nativeName">
                            <span class="country__type">Native Name: </span>{{ country.nativeName }}
                        </div>
                        <div class="country__population">
                            <span class="country__type">Population: </span>{{ country.population }}
                        </div>
                        <div class="country__region">
                            <span class="country__type">Region: </span>{{ country.region }}
                        </div>
                        <div class="country__subregion">
                            <span class="country__type">Sub Region: </span>{{ country.subregion }}
                        </div>
                        <div class="country__capital">
                            <span class="country__type">Capital: </span>{{ country.capital }}
                        </div>
                    </div>
                    <div class="country__description_first">
                        <div class="country__domain">
                            <span class="country__type">Top Level Domain: </span>
                            <span v-for="(item, index) in country.topLevelDomain" :key="item"
                                class="country__type country__type_other">{{
                                    item }}{{
                                    index !== country.topLevelDomain.length - 1 ? ', ' : '' }}</span>
                        </div>
                        <div class="country__currencies">
                            <span class="country__type">Currencies: </span>
                            <span v-for="(item, index) in country.currencies" :key="item"
                                class="country__type country__type_other">{{ item.code }}{{
                                    index !== country.languages.length - 1 ? ', ' : '' }}</span>
                        </div>
                        <div class="country__languages">
                            <span class="country__type">Languages: </span>
                            <span v-for="(item, index) in country.languages" :key="item"
                                class="country__type country__type_other">{{ item.name }}{{
                                    index !== country.languages.length - 1 ? ', ' : '' }}</span>
                        </div>
                    </div>
                </div>
                <div class="country__button-wrapper">
                    <p class="country__border">Border Countries:</p>
                    <div class="country__border-button-wrapper">
                        <Button v-for="item in country.bordersCountriesName"
                            class="country__button country__border-button" @click="goToCountry(item)"
                            :text="getFirstNameBordersCountry(item)" />
                    </div>
                </div>
            </div>
        </div>
        <span v-if="loader" class="home__loader"></span>
        <p v-if="loadDataMessage" class="home__message">{{ loadDataMessage }}</p>
    </div>
</template>

<style lang="scss">
.country {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 28px 0;

    &__button {
        align-self: flex-start;
    }

    &__flag {
        width: 320px;
        height: 229px;
        border-radius: 5.72px;

        &-wrapper {
            width: 320px;
            height: 229px;
            margin-bottom: 44px;
            border-radius: 5.72px;
        }
    }

    &__title {
        font-family: 'Nunito Sans';
        font-size: 22px;
        font-weight: 800;
        margin-bottom: 16px;
    }

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

    &__type {
        font-family: 'Nunito Sans';
        font-size: 14px;
        font-weight: 600;

        &_other {
            font-family: 'Nunito Sans';
            font-size: 14px;
            font-weight: 300;
        }
    }

    &__nativeName {
        font-family: 'Nunito Sans';
        font-size: 14px;
        font-weight: 300;
        margin-bottom: 8px;
    }

    &__population {
        font-family: 'Nunito Sans';
        font-size: 14px;
        font-weight: 300;
        margin-bottom: 8px;
    }

    &__region {
        font-family: 'Nunito Sans';
        font-size: 14px;
        font-weight: 300;
        margin-bottom: 8px;
    }

    &__subregion {
        font-family: 'Nunito Sans';
        font-size: 14px;
        font-weight: 300;
        margin-bottom: 8px;
    }

    &__capital {
        font-family: 'Nunito Sans';
        font-size: 14px;
        font-weight: 300;
        margin-bottom: 32px;
    }

    &__domain {
        font-family: 'Nunito Sans';
        font-size: 14px;
        font-weight: 300;
        margin-bottom: 8px;
    }

    &__currencies {
        font-family: 'Nunito Sans';
        font-size: 14px;
        font-weight: 300;
        margin-bottom: 8px;
    }

    &__languages {
        font-family: 'Nunito Sans';
        font-size: 14px;
        font-weight: 300;
        margin-bottom: 34px;
    }

    &__border {
        font-family: 'Nunito Sans';
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;

        &-button {
            width: 96px;
            height: 28px;
            margin-bottom: 0;
            margin-right: 10px;

            .button {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            &-wrapper {
                display: grid;
                grid-row-gap: 20px;
                grid-column-gap: 10px;
                grid-template-columns: repeat(3, 96px);
                grid-template-rows: min-content;
                margin-bottom: 60px;
            }
        }
    }

    &__content {
        max-width: 320px;

        &_desktop {
            display: grid;
            grid-template-rows: min-content;
            grid-template-columns: 560px 598px;
            grid-column-gap: 120px;
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
    .country {
        padding: 34px 82px 0;

        &__title {
            font-size: 32px;
            margin-bottom: 23px;
        }

        &__type {
            font-size: 16px;
        }

        &__nativeName {
            font-size: 16px;
            margin-bottom: 8px;
        }

        &__population {
            font-size: 16px;
            margin-bottom: 8px;
        }

        &__region {
            font-size: 16px;
            margin-bottom: 8px;
        }

        &__subregion {
            font-size: 16px;
            margin-bottom: 8px;
        }

        &__capital {
            font-size: 16px;
            margin-bottom: 0;
        }

        &__domain {
            font-size: 16px;
            margin-bottom: 8px;
        }

        &__currencies {
            font-size: 16px;
            margin-bottom: 8px;
        }

        &__languages {
            font-size: 16px;
            margin-bottom: 0;
        }

        &__button {
            margin-bottom: 82px;
            grid-area: 1 / 1 / 2 / 2;

            &-wrapper {
                display: flex;
            }
        }

        &__description {
            display: flex;
            justify-content: space-between;
            margin-bottom: 68px;

            &-wrapper {
                display: flex;
                flex-direction: column;
                justify-content: center;
                grid-area: 2/2/3/3;
            }
        }

        &__border {
            display: inline;
            min-width: 145px;
            margin-bottom: 0;

            &-button {
                margin-right: 0;
                margin-bottom: 0;

                &-wrapper {
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 0;
                    grid-row-gap: 10px;
                }
            }
        }

        &__flag {
            width: 560px;
            height: 401px;

            &-wrapper {
                width: 560px;
                height: 401px;
                grid-area: 2/1/3/2;
                margin-bottom: 0;
            }
        }
    }
}
</style>
