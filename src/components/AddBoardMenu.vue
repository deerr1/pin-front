<template>
  <q-dialog v-model="props.addBoard" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-form @submit="addBoard" @reset="close(false)" class="q-gutter-md">
          <div class="text-center text-h5">Добавление доски</div>
          <q-input
            bg-color="white"
            rounded
            outlined
            v-model="nameBoard"
            label="Название доски"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Заполните название']"
          />
          <q-select
            v-model="typeBoard"
            :options="['Открытая', 'Закрытая']"
            label="Тип доски"
            outlined
          />
          <div>
            <q-btn label="Добавить" type="submit" color="orange" />
            <q-btn
              label="Закрыть окно"
              type="reset"
              color="black"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "@vue/runtime-core";
import axios from "axios";

export default defineComponent({
  props: {
    addBoard: {
      required: true,
      type: Object as PropType<boolean>,
    },
  },
  setup(props, { emit }) {
    const nameBoard = ref<string>();
    const typeBoard = ref<string>("Открытая");

    function close(action:boolean) {
      nameBoard.value = "";
      typeBoard.value = "Открытая"
      emit("closes", action);
    }

    function addBoard() {
      axios
        .post("/pins/user-changed-board/", {
          "name": nameBoard.value,
          "access": typeBoard.value == "Открытая" ? 0 : 1,
        })
        .then(() => {
          close(true);
        });
    }

    return {
      props,
      close,
      typeBoard,
      nameBoard,
      addBoard,
    };
  },
});
</script>

<style></style>
