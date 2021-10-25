<template>
  <div class="window">
    <div class="q-pa-md" style="max-width: 400px" id="window_reg">
      <q-form class="q-gutter-md">
        <h4>Авторизация</h4>

        <q-input
          bg-color="white"
          filled
          v-model="login"
          label="Логин*"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Пожалуйста, напишите что-нибудь',
          ]"
        />
        <q-input
          bg-color="white"
          filled
          v-model="pass"
          label="Пароль"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Пожалуйста, напишите что-нибудь',
          ]"
        />

        <div class="btn">
          <q-btn @click="auth" label="Войти" type="submit" color="orange" />
          <q-btn
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
import axios from 'axios';

export default {
  setup() {
    const login = ref<string|null>(null);
    const pass = ref<string|null>(null);
    return {
      login,
      pass,
    };


  },
  methods: {
      auth(){
          axios.post("")
      }
  }
};
</script>

<style>
.window {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 960px;
}

.q-pa-md {
  width: 531px;
  height: 706px;
  border: solid 2px black;
  border-radius: 30px;
  filter: drop-shadow(15px 15px 10px rgba(0, 0, 0, 0.4));
  background-color: #242424;
}
.q-gutter-md {
  margin-top: 0px !important;
  margin-left: -16px !important;
  height: 706px;
}

h4 {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 16px;
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
