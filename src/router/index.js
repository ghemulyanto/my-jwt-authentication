import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'

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
        },
        {
            path:'/signup',
            name: 'Signup',
            component: Signup
        }
    ]
})

export default router