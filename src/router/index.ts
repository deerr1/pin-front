import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import Registration from "../views/Registration.vue";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   name: "MainPage",
  //   component: Login,
  // },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registration",
    name: "registration",
    component: Registration,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
