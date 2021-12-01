<template>
  <Header />
  <div class="app">
    <q-avatar style="width: 120px; height: 120px; margin: 25px 25px 25px 90px">
      <img
        src="https://www.factroom.ru/wp-content/uploads/2019/06/10-faktov-o-evgenii-ponasenkove-kotoryj-svodit-vsekh-s-uma-1250x883.jpg"
      />
    </q-avatar>
    <q-btn color="orange" text-color="white" label="Сменить фото" style="left: 5px" />

    <div class="Setting">
      <div class="q-gutter-md" style="max-width: 300px">
        <div>Данные</div>
        <q-input v-model="text" rounded outlined label="Имя" />
        <q-input v-model="text" rounded outlined label="Почта" />
        <div>Смена пароля</div>
        <q-input v-model="text" rounded outlined label="Новый пароль" />
        <q-input v-model="text" rounded outlined label="Повторить пароль" />
      </div>

      <div class="GroupButton">
        <div class="q-pa-md q-gutter-sm">
          <q-btn color="green" text-color="white" label="Сохранить" />
          <q-btn color="grey" text-color="white" label="Отменить" />
          <q-btn color="red" text-color="white" label="Удалить аккаунт" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from "../components/Header.vue";
export default {
  components: {
    Header,
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
