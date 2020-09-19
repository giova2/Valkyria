import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Panel from "../views/Panel.vue";
import Valkyria from "../views/Valkyria.vue";
import Contacto from "../views/Contacto.vue";

const BASE = process.env.VUE_APP_BASE_PATH ? process.env.VUE_APP_BASE_PATH : "";
const routes: Array<RouteRecordRaw> = [
  {
    path: `${BASE}/login`,
    component: Login,
  },
  {
    path: `${BASE}/panel`,
    component: Panel,
    meta: {
      // esto es el equivalente a middleware en Laravel
      requiresAuth: true,
    },
  },
  {
    path: `${BASE}/`,
    component: () => import("../views/Valkyria.vue"),
  },
  {
    path: `${BASE}/valkyria`,
    component: Valkyria,
  },
  {
    path: `${BASE}/contacto`,
    component: Contacto,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/valkyria",
  },
];

const router = createRouter({
  // process.env.BASE_URL
  history: createWebHistory(),
  routes,
});
router.beforeResolve((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("expiration");
    const exp = expiration ? expiration : "0";
    const todayDateInSeconds = new Date().getTime();
    if (
      token === null ||
      token === undefined ||
      (token && parseInt(exp) < todayDateInSeconds)
    ) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
      // fetch(`${process.env.VUE_APP_LARAVEL_API_URL}api/check`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((response) => {
      //     if (response) {
      //       next();
      //     } else {
      //       next({ path: "/login", params: { nextUrl: to.fullPath } });
      //     }
      //   })
      //   .catch((error) => next({ path: "/" }));
    }
  } else {
    next();
  }
});
export default router;
