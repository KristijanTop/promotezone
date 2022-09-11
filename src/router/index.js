import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      needsUser: true,
    }
  },
  {
    path: '/FrontPage',
    name: 'FrontPage',
    component: () => import('../views/FrontPage.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/MyCollaborators',
    name: 'MyCollaborators',
    component: () => import('../views/MyCollaborators.vue'),
    meta: {
      needsUser: true,
    }
  },
  {
    path: '/Messages',
    name: 'Messages',
    component: () => import('../views/Messages.vue'),
    meta: {
      needsUser: true,
    }
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: {
      needsUser: true,
    }
  },
  {
    path: '/:username',
    name: 'MyProfile',
    component: () => import('../views/MyProfile.vue'),
    meta: {
      needsUser: true,
    }
  },
  {
    path: '/:profileName',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      needsUser: true,
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log('Old route', from.name, '->', to.name, 'user', store.currentUser);

  const noUser = store.currentUser === null;

  if (noUser && to.meta.needsUser) {
      next('FrontPage');
  } else {


      next();
  }

});

export default router
