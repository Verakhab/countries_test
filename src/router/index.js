import { createRouter, createWebHistory } from 'vue-router';

// components
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'HomeView',
            component: HomeView
        },
        {
            path: '/:name',
            name: 'CountryView',
            component: () => import('../views/CountryView.vue')
        }
    ]
})

export default router;
