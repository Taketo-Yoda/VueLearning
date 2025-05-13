import { createRouter, createWebHistory } from 'vue-router'
import Bill from './views/Bill.vue'
import Desstination from './views/Destination.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Desstination
        },
        {
            path: '/bill',
            component: Bill
        }
    ]
})
