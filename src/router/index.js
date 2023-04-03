import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'À propos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/materiels',
    name: 'Materiels',
    component: () => import(/* webpackChunkName: "Materiels" */ '../views/Materiels.vue'),
    children: [
      {
        path: ':id',
        name: 'MaterielsInfo',
        component: () => import('../views/Materiels.vue'),
        children: [
          {
            path: 'edit',
            name: 'MaterielsEdit',
            component: () => import('../views/EditMateriel.vue')
          },
        ]
      },
      {
        path: 'add',
        name: 'MaterielsAdd',
        component: () => import('../views/EditMateriel.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
