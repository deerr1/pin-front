<template>
  <div class="window">
    <div class="q-pa-md" style="max-width: 400px" id="window_reg">
      <q-form @reset="onReset" class="q-gutter-md">
        <h4>Регистрация</h4>

        <q-input
          bg-color="white"
          rounded outlined
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
          rounded outlined
          v-model="contact_data"
          label="Почта*"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Пожалуйста, напишите что-нибудь',
          ]"
        />

        <q-input
          bg-color="white"
          rounded outlined
          v-model="pass"
          label="Пароль"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Пожалуйста, напишите что-нибудь',
          ]"
        />

        <q-input
          bg-color="white"
          rounded outlined
          v-model="repitpass"
          label="Повтарите пароль"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Пожалуйста, напишите что-нибудь',
          ]"
        />
        <div class="btn">
          <q-btn @click="registr()" label="Регистрация" type="submit" color="orange" />
        </div>
        <div class="btn">
          <q-btn
            @click="this.$router.push('Login')"
            label="Есть аккаунт? Войти"
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
import { useQuasar } from "quasar";
import { ref } from "vue";
import store from '@/store';
import router from '@/router';

export default {
  setup() {
    const login = ref<string|null>(null);
    const contact_data = ref<string|null>(null);
    const pass = ref<string|null>(null);
    const repitpass = ref<string|null>(null);

    function registr(){
          let data = {"email": contact_data.value, "username": login.value, "password": pass.value}
          store.dispatch("registration", data)
          .then(()=> router.push('/login'))
          .catch(err=> console.log(err))

      };

    return {
      login,
      contact_data,
      pass,
      repitpass,
      registr
    };
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
  height: 716px;
  border-radius: 30px;
  filter: drop-shadow(15px 15px 10px rgba(0, 0, 0, 0.4));
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
  margin: 45px !important;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
