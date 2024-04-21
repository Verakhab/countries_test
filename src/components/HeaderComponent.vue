<script>
export default {
    name: 'HeaderComponent',
    data() {
        return {}
    }
}
</script>

<template>
    <header class="header">
        <div class="header__slogan">Where in the world?</div>
    </header>
</template>

<style lang="scss">
.header {
    width: 100%;
    height: 80px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.0562);
    -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.0562);
    -moz-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.0562);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 30px 16px 30px 16px;
    margin-bottom: 24px;

    &__slogan {
        font-family: 'Nunito Sans';
        font-weight: 800;
        color: #000000;
        font-size: 14px;
    }
}
</style>
