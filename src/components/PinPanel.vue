<template>
  <div class="row justify-between col-12" :key="$route.path">
    <div class="col-3 self-center">
      <q-btn
        flat
        round
        color="black"
        icon="file_download"
        @click="download"
        size="15px"
      />
      <q-btn flat round color="black" icon="link" @click="copy()" size="15px" />
    </div>
    <div
      class="row justify-between col-9 self-center"
      v-if="store.getters.isLoggedIn"
    >
      <q-select
        class="col-6"
        v-model="model"
        :options="boards"
        label="Доска"
        outlined
      >
        <template #selected>
          <div>{{ model?.name }}</div>
          <q-item-section v-if="model?.name != null" side>
            <q-icon v-if="model?.access == 2" name="lock" />
            <q-icon v-else name="lock_open" />
          </q-item-section>
        </template>
        <template v-slot:option="{ itemProps, opt, toggleOption }">
          <q-item v-bind="itemProps" clickable @click="toggleOption(opt.board)">
            <q-item-section>
              <q-item-label>{{ opt.board.name }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon v-if="opt.board.access == 2" name="lock" />
              <q-icon v-else name="lock_open" />
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:after-options>
          <q-btn icon="add" class="full-width" label="Добавить доску" @click="addBoard = true"/>
        </template>
        <template v-slot:no-option>
            <q-item class="text-body1 text-grey"> Нет досок </q-item>
            <q-btn icon="add" class="full-width" label="Добавить доску"  @click="addBoard = true"/>
        </template>
      </q-select>
      <q-btn
        class="col-5 q-mr-lg"
        color="orange"
        unelevated
        rounded
        label="Сохранить"
        @click="SaveBoard()"
      />
    </div>
  </div>
  <AddBoardMenu :addBoard="addBoard" @closes="closeMenu"></AddBoardMenu>
</template>

<script lang="ts">
import { exportFile } from "quasar";
import { uid, useQuasar } from "quasar";
import { copyToClipboard } from "quasar";
import { defineComponent, onMounted, PropType, ref } from "@vue/runtime-core";
import AddBoardMenu from "./AddBoardMenu.vue"
import axios from "axios";
import { useStore } from "vuex";

interface Board {
  id: number | null;
  name: string | null;
  access: number | null;
}

interface UserBoard {
  user: number;
  board: Board;
}

export default defineComponent({
  props: {
    link: {
      required: true,
      type: Object as PropType<string>,
    },
    file: {
      required: true,
      type: Object as PropType<string>,
    },
    id: {
      required: true,
      type: Object as PropType<number>,
    },
  },
  setup(props) {
    const store = useStore();
    const model = ref<Board | null>(null);
    const $q = useQuasar();
    const addBoard = ref<boolean>(false)

    const boards = ref<Array<UserBoard>>();

    function download() {
      axios
        .get(props.file, {
          responseType: "arraybuffer",
        })
        .then((resp) => {
          console.log(typeof (resp.data as ArrayBuffer));
          exportFile(uid() + ".png", resp.data as string);
        });
    }

    function copy() {
      copyToClipboard(props.link).then(() => {
        $q.notify({
          position: "top",
          color: "positive",
          icon: "done",
          message: "Ссылка скопирована",
          timeout: 50,
        });
      });
    }

    function SaveBoard() {
      console.log({ pin: props.id, board: model.value?.id });
      if (model.value != null) {
        axios
          .post("/pins/user-add-pin-on-board/", {
            pin: props.id,
            board: model.value?.id,
          })
          .then(() => {
            $q.notify({
              position: "top",
              color: "positive",
              icon: "add",
              message: "Изображение добавлено на доску",
              timeout: 80,
            });
          });
      }
    }

    function closeMenu(action:boolean) {
      addBoard.value = false
      if (action==true){
        getBoards()
      }
    }

    function getBoards() {
      if (store.getters.isLoggedIn) {
        axios.get("/pins/user-boards/").then((resp) => {
          var data = resp.data as Array<UserBoard>;
          boards.value = data;
        });
      }
    }

    onMounted(() => {
      getBoards()
    });

    return {
      download,
      copy,
      SaveBoard,
      model,
      store,
      boards,
      addBoard,
      closeMenu,
    };
  },
  components:{
    AddBoardMenu
  }
});
</script>

<style></style>
