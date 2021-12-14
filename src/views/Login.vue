<template>
  <div class="window">
    <div class="q-pa-md" style="max-width: 400px" id="window_reg">
      <q-form class="q-gutter-md">
        <h4>Авторизация</h4>
        <div v-if="store.getters.authStatus=='error'" class="q-mx-xl text-red">
          Неверный логин или пароль
        </div>
        <q-input
          bg-color="white"
          rounded
          outlined
          v-model="username"
          label="Логин*"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите логин']"
        />
        <q-input
          bg-color="white"
          rounded
          outlined
          :type="isPwd ? 'password' : 'text'"
          v-model="pass"
          label="Пароль"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите пароль']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="btn">
          <q-btn @click="login()" label="Войти" type="submit" color="orange" />
        </div>
        <div class="btn">
          <q-btn
            @click="this.$router.push('Registration')"
            label="Нет аккаунта? Зарегестрироваться"
            color="white"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import store from "@/store";
import router from "@/router";
import { useStore } from 'vuex';

export default {
  setup() {
    const username = ref<string | null>(null);
    const pass = ref<string | null>(null);
    const isPwd = ref<boolean>(true);
    const store = useStore();

    function login() {
      let data = { username: username.value, password: pass.value };
      if(username.value!=null && pass.value!=null){
        store
          .dispatch("login", data)
          .then(() => router.push("/"))
      }
    }
    return {
      username,
      pass,
      login,
      isPwd,
      store,
    };
  },
};
</script>

<style scoped>
.window {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 960px;
  background-image: url("../img/1.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.q-pa-md {
  width: 531px;
  height: 706px;
  border-radius: 30px;
  filter: drop-shadow(15px 15px 10px rgba(0, 0, 0, 0.4));
  background-color: #1c1c1c;
}
.q-gutter-md {
  margin-top: 0px !important;
  margin-left: -16px !important;
  height: 706px;
  padding: 16px;
}

h4 {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin: 145px 145px 0 145px !important;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 16px;
  padding: 16px;
}
</style>
