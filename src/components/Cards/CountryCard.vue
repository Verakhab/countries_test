<script>
export default {
    name: 'CountryCard',
    data() {
        return {
            country: null,
        }
    },
    methods: {
        // переход на страницу страны
        goToCountry() {
            let routeName = '';

            if (this.card.name.includes('(')) {
                routeName = this.card.name.replace(/[\\(\\)]/g, '');
            }

            routeName ?
                routeName = routeName.toLowerCase().split(' ').join('-') :
                routeName = this.card.name.toLowerCase().split(' ').join('-');

            this.$router.push(routeName);
        }
    },
    props: {
        card: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>

<template>
    <div class="country-card" @click="goToCountry">
        <div class="country-card__flag-wrapper">
            <img :src="card.flags.png" alt="flag" class="country-card__flag">
        </div>
        <div class="country-card__description">
            <p class="country-card__country">
                {{ card.name }}
            </p>
            <div class="country-card__population">
                <span class="country-card__type">Population: </span>{{ card.population }}
            </div>
            <div class="country-card__region">
                <span class="country-card__type">Region: </span>{{ card.region }}
            </div>
            <div class="country-card__capital">
                <span class="country-card__type">Capital: </span>{{ card.capital }}
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.country-card {
    width: 264px;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.0294);
    -webkit-box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.0294);
    -moz-box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.0294);

    &__flag {
        width: 100%;
        height: 160px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;

        &-wrapper {
            height: 160px;
        }
    }

    &__description {
        padding: 24px 24px 46px;

    }

    &__country {
        font-family: 'Nunito Sans';
        font-size: 18px;
        font-weight: 800;
        margin-bottom: 16px;
    }

    &__type {
        font-family: 'Nunito Sans';
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 16px;
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

    &__capital {
        font-family: 'Nunito Sans';
        font-size: 14px;
        font-weight: 300;
    }
}

@media (min-width: 1440px) {
    .country-card {
        margin-bottom: 0;
    }
}
</style>
