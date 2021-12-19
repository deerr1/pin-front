<template>
  <div class="column content-center">
    <div class="row justify-center">
      <q-avatar size="150px">
        <img
          :src="user?.avatar ? user.avatar : require('../img/noImage.svg.png')"
        />
      </q-avatar>
      <div class="column justify-center">
        <q-btn
          color="orange"
          text-color="white"
          label="Сменить фото"
          style="left: 5px"
          @click="addAvatar = true"
        />
      </div>
    </div>
    <q-form @submit="saveUser" @reset="resetUser">
      <div class="text-h5 text-center q-mb-lg">Данные</div>
      <div v-if="errorData" class="text-h6 text-center text-red q-mb-lg">Введенные данные уже есть у другого пользователя</div>
      <div class="row justify-center">
        <q-input
          class="q-mr-xl"
          v-model="username"
          rounded
          outlined
          label="username"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите логин']"
        />
        <q-input
          v-model="email"
          rounded
          outlined
          label="Email"
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
      </div>

      <div class="row q-pa-md q-gutter-sm">
        <q-btn
          color="orange"
          type="submit"
          text-color="white"
          label="Сохранить"
        />
        <q-btn color="grey" type="reset" text-color="white" label="Отменить" />
      </div>
    </q-form>
  </div>
  <AddAvatar
    :addAvatar="addAvatar"
    :avatar="user?.avatar"
    @close="close"
    :key="user"
  ></AddAvatar>
</template>

<script lang="ts">
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import AddAvatar from "../components/AddAvatar.vue";
import { useQuasar } from 'quasar';

interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

export default {
  setup() {
    const user = ref<User>();
    const username = ref<string>();
    const email = ref<string>();
    const addAvatar = ref<boolean>();
    const errorData = ref<boolean>(false);
    const $q = useQuasar()

    function getUser() {
      axios.get("/users/user/").then((resp) => {
        let data = resp.data as User;
        user.value = data;
        username.value = data.username;
        email.value = data.email;
        console.log(data);
        errorData.value = false
      });
    }

    function saveUser() {
      if (
        username.value?.trim() != user.value?.username.trim() ||
        email.value?.trim() != user.value?.email.trim()
      )
      {
        console.log('sdfsfd')
        let data = new FormData()
        data.append("username", ""+username.value)
        data.append("email", ""+email.value)
        let config = { headers: { "Content-Type": "multipart/form-data" } };
        axios.put("/users/user-change/", data, config)
        .then(()=>{
          $q.notify({
              position: "top",
              color: "positive",
              icon: "check",
              message: "Информация обновлена",
              timeout: 80,
            });
          getUser()
        })
        .catch(()=>{
          errorData.value = true
        })
      }
    }

    function resetUser() {
      errorData.value = false
      username.value = user.value?.username
      email.value = user.value?.email
    }

    function close(action: boolean) {
      addAvatar.value = false;
      if (action) {
        getUser();
      }
    }

    onMounted(() => {
      getUser();
    });
    return {
      user,
      username,
      email,
      addAvatar,
      errorData,
      close,
      saveUser,
      resetUser,
    };
  },
  components: {
    AddAvatar,
  },
};
</script>

<style scoped>
.Setting {
  display: flex;
  margin: 45px 90px;
}

.GroupButton {
  margin: 0px 90px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.q-pa-md {
  display: flex;
  flex-direction: column;
}
</style>
