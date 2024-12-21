import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "auth",
      path: "/auth",
      component: () => import("@/views/AuthView.vue"),
    },
    {
      name: "gift",
      path: "/gift",
      component: () => import("@/layouts/AppLayout.vue"),
      redirect: { name: "home" },
      children: [
        {
          name: "home",
          path: "home",
          component: () => import("@/views/HomeView.vue"),
        },
      ],
    },
    {
      path: "/:catchAll(.*)",
      redirect: { name: "gift" },
    },
  ],
});

function isAuthenticated() {
  localStorage.setItem('authToken', 'valor')
  const token = localStorage.getItem('authToken');
  console.log(token);
  
  return token;
}

router.beforeEach((to, from, next) => {
  if (to.name !== 'auth' && !isAuthenticated()) next({ name: 'auth' })
    else next()
});

export default router;
