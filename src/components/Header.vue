<template>
  <div>
    <q-toolbar class="bg-black text-white" :shrink="true">
      <q-toolbar-title class="row spase-around" id="title">
        <img src="../img/logo.png" id="logo" />
        <q-btn
          rounded
          outlined
          class="row text-orange"
          color="black"
          icon="home"
          label="Главная"
          id="btn-main"
          @click="this.$router.push('/')"
        />
      </q-toolbar-title>
      <div class="absolute-center" id="search">
        <q-input
          id="search"
          rounded
          outlined
          v-model="text"
          bg-color="white"
          label="Поиск пинов"
          :dense="true"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div v-if="isLogedIn">
        <q-btn
          class="text-orange"
          color="black"
          icon="forum"
          @click="this.$router.push('Chat')"
        />
        <q-btn
          class="text-orange"
          color="black"
          icon="notifications"
          @click="onClick"
        />
        <q-btn-dropdown class="text-orange" color="black" icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>что-то тут будет</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="logout()">
              <q-item-section>
                <q-item-label>Выйти</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <!-- <q-btn class="text-orange" color="black" icon="person" @click="onClick"/> -->
      </div>
      <div v-else>
        <q-btn
          label="Войти"
          class="text-orange"
          icon="login"
          @click="login()"
        />
      </div>
    </q-toolbar>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import router from "@/router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const isLogedIn = ref<boolean>(store.getters.isLoggedIn);
    function login() {
      router.push("/login");
    }
    function logout() {
      store.dispatch("logout").then(() => router.push("/login"));
    }
    return {
      isLogedIn,
      login,
      logout,
    };
  },
};
</script>

<style scoped>
#title {
  width: 300px;
  margin: 7px;
}
#logo {
  width: 40px;
  height: 40px;
  margin-left: 15px;
}
#btn-main {
  margin-left: 15px;
}
#search {
  width: 1000px;
}
</style>
