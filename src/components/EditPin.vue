<template>
  <q-dialog v-model="props.editPin" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-form @submit="update" @reset="close(false)" class="q-gutter-md">
          <div class="text-center q-mb-lg text-h5">Изменение пина</div>
          <div class="row justify-between q-mx-lg" style="height: 30vh">
            <div class="row col-12">
              <div class="row justify-between col-12 self-center">
                <q-select
                  class="col-12 q-mb-lg"
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
                    <q-item
                      v-bind="itemProps"
                      clickable
                      @click="toggleOption(opt.board)"
                    >
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
                    <q-btn
                      icon="add"
                      class="full-width"
                      label="Добавить доску"
                      @click="addBoard = true"
                    />
                  </template>
                  <template v-slot:no-option>
                    <q-item class="text-body1 text-grey"> Нет досок </q-item>
                    <q-btn
                      icon="add"
                      class="full-width"
                      label="Добавить доску"
                      @click="addBoard = true"
                    />
                  </template>
                </q-select>
              </div>
              <div class="row col-12 justify-between">
              <q-input
                v-if="isYou"
                bg-color="white"
                rounded
                outlined
                v-model="namePin"
                label="Название картинки"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Заполните название',
                ]"
              />
              <q-input
                v-if="isYou"
                bg-color="white"
                outlined
                autogrow
                v-model="description"
                label="Описание"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Заполните название',
                ]"
              />
              </div>
            </div>
          </div>
          <div class="row justify-between self-center q-mx-lg q-mt-xl">
            <q-btn label="Сохранить" type="submit" color="orange"  class="q-mx-sm"/>
            <q-btn label="Удалить" color="negative" @click="showWraning"/>
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
  <AddBoardMenu :addBoard="addBoard" @closes="closeMenuBoard"></AddBoardMenu>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "@vue/runtime-core";
import AddBoardMenu from "./AddBoardMenu.vue"
import axios from "axios";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

interface Board {
  id: number | null;
  name: string | null;
  access: number | null;
}

interface UserBoard {
  user: number;
  board: Board;
}

interface Pin {
    id: number,
    name: string,
    description: string,
    board: Array<Board>,
    isYou: boolean
}

export default defineComponent({
  props: {
    editPin: {
      required: true,
      type: Object as PropType<boolean>,
    },
    pin: {
        required: true,
        type: Object as PropType<number>
    },
    board: {
        required: true,
        type: Object as PropType<number>
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const model = ref<Board>()
    const boards = ref<Array<UserBoard>>()
    const namePin = ref<string|undefined>("");
    const description = ref<string|undefined>("");
    const addBoard = ref<boolean>(false)
    const pin = ref<Pin>();
    const board = ref<Board>();
    const $q = useQuasar()
    const isYou = ref<boolean>();

    function close(action: boolean) {
      namePin.value = pin.value?.name
      description.value = pin.value?.description
      model.value = board.value
      emit("close", action);
    }

    function closeMenuBoard(action: boolean) {
        addBoard.value = false
        if(action){
            getBoards()
        }
    }

    function getBoards() {
      if (store.getters.isLoggedIn) {
        axios.get("/pins/user-boards/" + store.getters.user)
        .then((resp) => {
          var data = resp.data as Array<UserBoard>;
          boards.value = data;
          var d = data.find(e => e.board.id == props.board)
          model.value = d?.board
          board.value = d?.board

        });
      }
    }

    function update() {
        let data = {
          "old_board_id": board.value?.id,
          "new_board_id": model.value?.id,
          "pin_id": props.pin,
          "name": namePin.value,
          "description": description.value
        }
        axios.put("/pins/pin-detail/", data)
        .then(()=>{
            close(true)
        })
    }

    function showWraning() {
      console.log(pin.value)
      $q.notify({
        position: "center",
        type: "warning",
        message: "Вы действительно хотите удалить картинку?",
        closeBtn: true,
        timeout: 20000,
        actions: [
          {
            label: "Удалить",
            color: "red",
            handler: () => {
             deletePin()
            },
          },
        ],
      });
    }

    function deletePin() {
      axios.delete("/pins/pin-detail/"+props.board+"/"+props.pin)
      .then(()=>{
        close(true)
      })
    }

    onMounted(()=>{
        axios.get("/pins/pin-detail/"+props.pin)
        .then((resp)=>{
            let data = resp.data as Pin
            console.log(data)
            pin.value = data
            namePin.value = pin.value.name
            description.value = pin.value.description
            console.log(pin.value.isYou)
            isYou.value = pin.value.isYou
            getBoards()
        })
    })

    return {
      close,
      closeMenuBoard,
      update,
      showWraning,
      props,
      namePin,
      description,
      model,
      boards,
      addBoard,
      isYou,
    };
  },
  components:{
      AddBoardMenu,
  }
});
</script>

<style></style>
