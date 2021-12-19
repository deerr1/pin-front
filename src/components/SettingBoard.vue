<template>
  <q-dialog v-model="props.setting" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-form @submit="updateBoard" @reset="close(false, false)" class="q-gutter-md">
          <div class="text-center text-h5">Настройки доски</div>
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
            v-model="selectBoard"
            :options="boards"
            label="Тип доски"
            outlined
          />
          <div class="roe">
            <q-btn label="Сохранить" type="submit" color="orange" />
            <q-btn
              class="q-mx-lg"
              label="Удалить"
              color="negative"
              @click="showWraning"
            />
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
import { defineComponent, onMounted, PropType, ref } from "@vue/runtime-core";
import axios from "axios";
import { useQuasar } from "quasar";

interface Board {
  id: number;
  name: string;
  access: number;
}

export default defineComponent({
  props: {
    setting: {
      required: true,
      type: Object as PropType<boolean>,
    },
    board: {
      required: true,
      type: Object as PropType<number>,
    },
  },
  setup(props, { emit }) {
    const board = ref<Board>();
    const nameBoard = ref<string>();
    const access = ref<number>(0);
    const boards = ref<Array<string>>(["Открытая", "Закрытая"]);
    const selectBoard = ref<string>(boards.value[access.value]);
    const $q = useQuasar();

    function close(action: boolean, del: boolean) {
      nameBoard.value = board.value?.name;
      selectBoard.value = boards.value[access.value];
      emit("close", action, del);
    }

    function updateBoard() {
        let data = {
            "name": nameBoard.value,
            "access": boards.value.indexOf(selectBoard.value)
        }
        axios.put("/pins/user-changed-board/"+props.board, data)
        .then(()=>{
            close(true, false)
        })
    }

    function showWraning() {
      $q.notify({
        position: "center",
        type: "warning",
        message: "Вы действительно хотите удалить Доску? C ней удаляться все картинки на ней!",
        closeBtn: true,
        timeout: 20000,
        actions: [
          {
            label: "Удалить",
            color: "red",
            handler: () => {
              deleteBoard();
            },
          },
        ],
      });
    }

    function deleteBoard() {
        axios.delete("/pins/user-changed-board/"+props.board)
        .then(()=>{
            close(true, true)
        })
    }

    onMounted(() => {
      axios.get("/pins/user-board-detail/" + props.board).then((resp) => {
        let data = resp.data as Board;
        console.log(data);
        board.value = data;
        nameBoard.value = data.name;
        access.value = data.access;
        selectBoard.value = boards.value[access.value];
      });
    });

    return {
      props,
      nameBoard,
      selectBoard,
      boards,
      close,
      updateBoard,
      showWraning,
    };
  },
});
</script>

<style></style>
