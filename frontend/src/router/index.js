import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/user/signup',
    name: 'signup',
    meta: { guess: true },
    component: () => import('../views/sign.vue')
  },
  {
    path: '/user/login',
    name: 'login',
    meta: { guess: true },
    component: () => import('../views/Signin.vue')
  },
  {
    path: '/adminpanel',
    name: 'PanelAdmin',
    meta: { login: true, admin: true },
    component: () => import('../views/panelAdmin.vue')
  },
  {
    path: '/stock',
    name: 'Stock',
    meta: { login: true },
    component: () => import('../views/Stock.vue')
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/menu.vue')
  },
  {
    path: '/reservation',
    name: 'reserve',
    meta: { login: true },

    component: () => import('../views/Reservation.vue')
  },
  {
    path: '/user/profile',
    name: 'profile',
    meta: { login: true },
    component: () => import('../views/userprofile.vue')
  },
  {
    path: '/promotion',
    name: 'promotion',
    component: () => import('../views/promotion.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/contact.vue')
  },
  {
    path: '/forgotpassword',
    name: 'forgotpassword',
    component: () => import('../views/forget_pass.vue')
  },
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   meta: { login: true },
  //   component: () => import('../views/userprofile.vue')
  // },

]

const router = new VueRouter({ routes })
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  const IsAdmin = localStorage.getItem('role')
  if (to.meta.login && !isLoggedIn) {
    alert('Please login first!')
    next({ path: '/user/login' })
  }

  if (to.meta.guess && isLoggedIn) {
    alert("You've already logged in")
    next({ path: '/' })
  }
  if(to.meta.admin && !(IsAdmin == 'staff')){
    alert("You don't have permission!")
    next({ path: '/menu' })
  }

  next()
})
export default router
