import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import Registration from "../views/Registration.vue";
import Complit from "../views/Complit.vue";
import Chat from "../views/Chat.vue";
import Profile from "../views/Profile.vue";
import Settings from "../views/Settings.vue";
import Border from "../views/Border.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Complit,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/border",
    name: "Border",
    component: Border,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  }
  else
  next()
})

export default router;
