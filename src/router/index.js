import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "auth",
      path: "/auth",
      component: () => import("@/views/AuthView.vue"),
      children: [
        {
          path: "login",
          name: "auth-login",
        },
        {
          path: "register",
          name: "auth-register",
        },
        {
          path: "recover",
          name: "recover-pass",
        },
      ],
    },
    
    {
      name: "confirm",
      path: "/verify-email",
      component: () => import("@/views/ConfirmAuthView.vue"),
    },

    {
      name: "reset-pass",
      path: "/reset-password",
      component: () => import("@/views/ResetPass.vue"),
    },

    {
      name: "gift",
      path: "/gift",
      meta: { requiresAuth: true },
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


// Middleware para verificar autenticação
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');

  // Verifica se a rota requer autenticação
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      // Redireciona para a página de login se o token não existir
      next({ name: 'auth-login' });
    } else {
      try {
        // Decodifica e valida o token
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          // Token expirado
          localStorage.removeItem('authToken');
          next({ name: 'auth-login' });
        } else {
          // Token válido
          next();
        }
      } catch (error) {
        console.error('Token inválido:', error);
        localStorage.removeItem('authToken');
        next({ name: 'auth-login' });
      }
    }
  } else {
    next(); // Permite acesso a rotas públicas
  }
});

export default router;
