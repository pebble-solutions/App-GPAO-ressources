import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },    
  {
    path: '/materiels',
    name: 'Materiels',
    component: () => import(/* webpackChunkName: "Materiels" */ '../views/Materiels.vue'),
    children: [
      {
        path: ':id',
        name: 'MaterielsInfo',
        component: () => import('../components/materiel/MaterielInformation.vue'),
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
  },

  {
    path: '/utilisateurs',
    name: 'Utilisateurs',
    component: () => import(/* webpackChunkName: "Materiels" */ '../views/Utilisateurs.vue'),
    children: [
      {
        path: ':id',
        name: 'UtilisateursInfo',
        component: () => import('../components/personnel/PersonnelInformation.vue'),
        children: [
          {
            path: 'ajoutmateriel',
            name: 'UtilisateursAdd',
            component: () => import('../views/EditMateriel.vue')
          },
        ]
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
