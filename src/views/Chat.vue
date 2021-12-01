<template>
  <Header />
  <div class="main-container absolute-center row">
    <div class="dialogs-container">
      <q-btn rounded outlined
        class="row text-black justify-center bg-white"
        id="dialog-form"
        @click="this.$router.push('#')"
      >
        <img src="../img/logo.png" id="logo" />
        <div id="dialog_name">{{ DialogName }}</div>
        <q-btn flat icon="delete" />
      </q-btn>
      <q-btn rounded outlined
        class="row text-black justify-center bg-white"
        id="dialog-form"
        @click="this.$router.push('#')"
      >
        <img src="../img/logo.png" id="logo" />
        <div id="dialog_name">{{ DialogName }}</div>
        <q-btn flat icon="delete" />
      </q-btn>
    </div>
    <div class="chat-container">
      <div class="msg-container">
        <div class="q-pa-md row justify-center" id="msg">
          <div style="width: 100%; max-width: 500px" class="msg-forms">
            <q-chat-message :text="['hey, how are you?']" sent />
            <q-chat-message :text="['doing fine, how r you?']" />
          </div>
        </div>
      </div>
      <div class="text-container">
        <q-btn class="text-orange" icon="add" />
        <div id="msg-input">
          <q-input
            rounded
            outlined
            v-model="text"
            bg-color="white"
            label="Введите сообщение"
            :dense="true"
          />
        </div>
        <q-btn class="text-orange" icon="send" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from "../components/Header.vue";
export default {
  data() {
    return {
      DialogName: "Евгений Панаскенко",
    };
  },
  components: {
    Header,
  },
};
</script>

<style>
.main-container {
  z-index: -1;
  width: 1050px;
  height: 100%;
  background: white;
  filter: drop-shadow(15px 15px 10px rgba(0, 0, 0, 0.3));
}
.dialogs-container {
  width: 400px;
  background: #e0e0e0;
  height: 100%;
  filter: drop-shadow(15px 15px 10px rgba(0, 0, 0, 0.25));
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  padding-left: 25px;
}
.chat-container {
  width: 650px;
  height: 100%;
}
.text-container {
  display: flex;
  align-items: row;
  width: 100%;
  height: 6%;
  background: #1c1c1c;
  padding: 8px;
}
.msg-container {
  width: 100%;
  height: 94%;
}
#msg {
  padding-top: 750px;
}
#msg-input {
  width: 100%;
}
#dialog-form {
  width: 90%;
  height: 50px;
  margin-top: 20px;
}
#dialog_name {
    margin: 15px
}
</style>
