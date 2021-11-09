import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import axios from "axios";
import { Vue } from "vue-class-component";

createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(store)
  .use(router)
  .mount("#app");

axios.defaults.baseURL = "http://localhost:8000/api/";
const token = localStorage.getItem('access_token')
if (token){
  axios.defaults.headers.common['Authorization'] = "Bearer " + token
}