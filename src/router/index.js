import { createRouter, createWebHistory } from "vue-router";
import AppLayout from '../layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:catchAll(.*)",
      redirect: { name: "home" },
    },
    {
      name: "main",
      path: "/",
      component: AppLayout,
      redirect: { name: "home" },
      children: [
        {
          name: "home",
          path: "/home",
          component: () => import("@/views/HomeView.vue"),
        },
      ],
    },
  ],
});

export default router;
