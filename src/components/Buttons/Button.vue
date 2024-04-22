<script>
export default {
    name: 'Button',
    data() {
        return {}
    },
    props: {
        text: {
            type: String,
            default: ''
        },
        img: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<template>
    <div class="button-wrapper">
        <button class="button">
            <img v-if="img" src="../../assets/img/call-made.svg" alt="arrow" class="button__img">
            {{ text }}
        </button>
    </div>
</template>

<style lang="scss">
.button-wrapper {
    width: 104px;
    height: 32px;
    margin-bottom: 64px;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.2931);
    -webkit-box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.2931);
    -moz-box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.2931);

    .button {
        width: 100%;
        height: 100%;
        border: none;
        cursor: pointer;
        padding: 6px 24px;
        border-radius: 2px;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Nunito Sans';
        font-size: 14px;
        font-weight: 300;
        color: black;

        &__img {
            margin-right: 8px;
        }
    }
}
</style>
