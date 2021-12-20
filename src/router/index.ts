import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import Registration from "../views/Registration.vue";
import Complit from "../views/Complit.vue";
import Chat from "../views/Chat.vue";
import Profile from "../views/Profile.vue";
import Settings from "../views/Settings.vue";
import Board from "../components/Board.vue";
import Pin from "../views/Pin.vue"
import Search from "../views/Search.vue"
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
    meta:{
      guest: true
    }
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
    meta:{
      guest: true
    }
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: "/profile/:username",
    name: "Profile",
    component: Profile,
    props: true,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: "/board/:id",
    name: "Board",
    props: true,
    component: Board,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: "/pin/:id",
    name: "Pin",
    props: true,
    component: Pin,
  },
  {
    path: "/search/:searchString",
    name: "Search",
    props: true,
    component: Search,
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
  else if(to.matched.some(record => record.meta.guest)) {
    if(store.getters.isLoggedIn){
      next('/')
      return
    }
    next()
  }
  next()
})

export default router;
