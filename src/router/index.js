import { createRouter, createWebHistory } from "vue-router";
import AppLayout from '../layouts/AppLayout.vue'
import AuthView from "@/views/AuthView.vue";

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
      redirect: { name: "auth" },
    },
  ],
});


export default router;
