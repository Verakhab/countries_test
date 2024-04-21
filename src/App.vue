<script>
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
export default {
    name: 'App',
    components: { HeaderComponent },
    data() {
        return {}
    }
}
</script>

<template>
    <HeaderComponent />
    <main class="main">
        <RouterView />
    </main>
</template>

<style></style>
