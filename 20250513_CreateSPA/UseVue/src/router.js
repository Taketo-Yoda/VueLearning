import { createRouter, createWebHistory } from 'vue-router'
import Bill from './views/Bill.vue'
import Destination from './views/Destination.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Destination
        },
        {
            path: '/bill',
            component: Bill
        }
    ]
})
