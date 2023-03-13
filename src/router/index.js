import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/store';

const CoachesList = ()=> import('../pages/CoachesList.vue')
const NotFound  = ()=> import('@/pages/NotFound.vue')
const CoachContact = ()=> import('@/pages/CoachContact.vue')
const RequestsList = ()=> import('../pages/RequestsList.vue')
const RegisterCoach = ()=> import('../pages/RegisterCoach.vue')
const UserAuth = ()=> import('@/pages/auth/UserAuth.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches'
    },
    {
      path: '/coaches',
      name: 'coaches',
      component: CoachesList,
    },
    {
      path: '/coaches/:coachId/contact',
      component: CoachContact,
      props: true
    },
    {
      path: '/coaches/:coachId',
      component: CoachContact,
      props: true
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterCoach,
      meta: { requiresAuth: true}
    },
    {
      path: '/requests',
      name: 'requests',
      component: RequestsList,
      meta: { requiresAuth: true}
    },
    { path: '/auth/:mode', component: UserAuth, props:true, meta: { requiresUnauth: true} },
    { path: '/:notFound(.*)', component: NotFound }
  ],
  linkActiveClass: 'active',
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition)
      return savedPosition
    else
      return { left: 0, top: 0 }
  }
})

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.getAuthentication) {
    next('/auth/login');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
})

export default router
