<template>
  <div class="column content-center">
    <div class="row justify-center">
      <q-avatar
        size="150px"
      >
        <img
          src="https://www.factroom.ru/wp-content/uploads/2019/06/10-faktov-o-evgenii-ponasenkove-kotoryj-svodit-vsekh-s-uma-1250x883.jpg"
        />
      </q-avatar>
      <div class="column justify-center">
        <q-btn
          color="orange"
          text-color="white"
          label="Сменить фото"
          style="left: 5px"
        />
      </div>
    </div>
    <div class="text-h5 text-center q-mb-lg">Данные</div>
    <div class="row justify-center">
      <q-input
        class="q-mr-xl"
        v-model="text"
        rounded
        outlined
        label="username"
      />
      <q-input v-model="text" rounded outlined label="Email" />
    </div>

    <div class="GroupButton">
      <div class="q-pa-md q-gutter-sm">
        <q-btn color="green" text-color="white" label="Сохранить" />
        <q-btn color="grey" text-color="white" label="Отменить" />
        <q-btn color="red" text-color="white" label="Удалить аккаунт" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  components: {},
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
