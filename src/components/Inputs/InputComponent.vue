<script>
export default {
    name: "InputComponent",
    methods: {
        changeData() {
            this.$emit('update:modelValue', this.$refs.input.value);
        }
    },
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: undefined,
        },
        disabled: {
            type: Boolean,
            default: null,
        },
    }
};
</script>

<template>
    <div class="input">
        <div class="input__wrapper">
            <input class="input__input" :class="{ 'input__input_disabled': disabled }" :placeholder="placeholder"
                :value="modelValue" @input="changeData" ref="input" :disabled="disabled" />
        </div>
    </div>
</template>

<style lang="scss">
.input {
    width: 100%;
    height: 48px;
    background-color: #ffffff;
    box-shadow: 0px 0 9px 0px rgba(0, 0, 0, 0.0532);
    -webkit-box-shadow: 0px 0 9px 0px rgba(0, 0, 0, 0.0532);
    -moz-box-shadow: 0px 0 9px 0px rgba(0, 0, 0, 0.0532);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 24px;
    border-radius: 5px;

    &__wrapper {
        width: 100%;
        height: 100%;
    }

    &__input {
        width: 100%;
        height: 100%;
        border: none;
        padding: 14px 16px 14px 74px;
        box-sizing: border-box;
        font-family: 'Nunito Sans';
        font-weight: 400;
        color: #000000;
        font-size: 12px;
        background: no-repeat 32px 16px / 16px 16px url('../../assets/img/search.svg'), transparent;

        &_disabled {
            opacity: 1;
            border-radius: 5px;
            background: no-repeat 32px 16px / 16px 16px url('../../assets/img/search.svg'), #dddddd;
        }

        &:focus {
            outline: none;
        }

        &::placeholder {
            font-family: 'Nunito Sans';
            font-weight: 400;
            color: #C4C4C4;
            font-size: 12px;
        }
    }
}
</style>
