import Vue from "vue";
import Router from "vue-router";

const Login = () => import("@/views/Login.vue");
const Home = () => import("@/views/Home.vue");

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("login");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else {
    if (to.meta.redirectIfAuth && user) {
      next({ name: to.meta.redirectIfAuth });
    } else {
      next();
    }
  }
});

export default router;
