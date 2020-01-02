import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path:'/',
            redirect:'/signin'
        },
        {
            path:'/signin',
            name: 'Signin',
            component: Signin
        }
    ]
})

export default router