import { createRouter, createWebHistory } from 'vue-router'
import CoachesList from '../pages/CoachesList.vue';
import CoachContact from '@/pages/CoachContact.vue';
import RequestsList from '../pages/RequestsList.vue';
import RegisterCoach from '../pages/RegisterCoach.vue';
import RequestsListVue from '../pages/RequestsList.vue';
import NotFound from '@/pages/NotFound.vue';

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
      component: RegisterCoach
    },
    {
      path: '/requests',
      name: 'requests',
      component: RequestsListVue
    },
    {
      path: '/requests',
      name: 'requests',
      component: RequestsList
    },
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

export default router
