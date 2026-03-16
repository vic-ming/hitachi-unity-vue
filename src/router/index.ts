import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import UnityView from '../views/UnityView.vue';

const routes = [
    {
        path: '/',
        name: 'landing',
        component: LandingPage,
    },
    {
        path: '/unity/:buildId',
        name: 'unity',
        component: UnityView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
