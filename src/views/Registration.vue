<template>
  <div class="window">
    <div class="q-pa-md" style="max-width: 400px" id="window_reg">
      <form @submit.prevent.stop="registr" class="q-gutter-md">
        <h4>Регистрация</h4>

        <q-input
          bg-color="white"
          ref="login_ref"
          rounded
          outlined
          v-model="login"
          label="Логин*"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите логин']"
        />

        <q-input
          ref="email_ref"
          bg-color="white"
          rounded
          outlined
          v-model="contact_data"
          label="Почта*"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Введите почту',
            (val) => {
              const re = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
              if (!re.test(val)) {
                return 'Вы неправильно ввели почту';
              }
              return true;
            },
          ]"
        />

        <q-input
          ref="pass_ref"
          bg-color="white"
          rounded
          outlined
          v-model="pass"
          label="Пароль"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите пароль']"
        />

        <q-input
          ref="repitpass_ref"
          bg-color="white"
          rounded
          outlined
          v-model="repitpass"
          label="Повторите пароль"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Введите пароль',
            (val) => val == pass || 'Введенный пароль не равен введеному выше',
          ]"
        />
        <div class="btn">
          <q-btn
            @click="registr()"
            label="Регистрация"
            type="submit"
            color="orange"
          />
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
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { ref } from "vue";
import store from "@/store";
import router from "@/router";

export default {
  setup() {
    const login = ref<string | null>(null);
    const contact_data = ref<string | null>(null);
    const pass = ref<string | null>(null);
    const repitpass = ref<string | null>(null);

    const login_ref = ref();
    const email_ref = ref();
    const pass_ref = ref();
    const repitpass_ref = ref();

    function registr() {
      login_ref.value.validate();
      email_ref.value.validate();
      pass_ref.value.validate();
      repitpass_ref.value.validate();

      if (
        login_ref.value.hasError ||
        email_ref.value.hasError ||
        pass_ref.value.hasError ||
        repitpass_ref.value.hasError
      ) {
        return;
      } else {
        let data = {
          email: contact_data.value,
          username: login.value,
          password: pass.value,
        };
        
        store
          .dispatch("registration", data)
          .then(() => router.push("/login"))
          .catch((err) => console.log(err));
      }
    }

    return {
      login,
      contact_data,
      pass,
      repitpass,
      registr,
      login_ref,
      email_ref,
      pass_ref,
      repitpass_ref,
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
  margin: 60px 145px 0 145px !important;
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
