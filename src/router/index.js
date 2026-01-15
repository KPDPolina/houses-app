import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HouseDetailView from '../views/HouseDetailView.vue'
import AboutView from '../views/AboutView.vue'
import CreateHouseView from '../views/CreateHouseView.vue'
import EditHouseView from '../views/EditHouseView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/houses/create',
    name: 'CreateHouse',
    component: CreateHouseView,
  },
  {
    path: '/houses/:id',
    name: 'HouseDetail',
    component: HouseDetailView,
    props: true,
  },
  {
    path: '/houses/:id/edit',
    name: 'EditHouse',
    component: EditHouseView,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
