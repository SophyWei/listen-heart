import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import PlayList from '../views/PlayList.vue'
import Recommend from '../views/Recommend.vue'

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'Recommend',
        component: Recommend,
        children: [],
        meta: { isShowNav: true },
    },
    {
        path: '/hot',
        name: 'Hot',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Hot.vue'),
        meta: { isShowNav: true },

    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
        meta: { isShowNav: true },

    },
    {
        path: '/playlist',
        name: 'PlayList',
        component: PlayList,
    },
]

const router = new VueRouter({
    routes
})

export default router