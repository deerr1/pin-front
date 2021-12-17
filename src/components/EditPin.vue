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
          <div class="row self-center q-mx-lg q-mt-xl">
            <q-btn label="изменить" type="submit" color="orange" />
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
    board: number
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

    function close(action: boolean) {
        namePin.value = pin.value?.name
        description.value = pin.value?.description
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
        axios.get("/pins/user-boards/" + store.getters.user).then((resp) => {
          var data = resp.data as Array<UserBoard>;
          boards.value = data;
        });
      }
    }

    function update() {
        let formData = new FormData()
        formData.append("board_id", ""+model.value?.id)
        formData.append("pin_id", ""+props.pin)
        formData.append("name", ""+namePin.value)
        formData.append("description", ""+description.value)
        let config = { headers: { "Content-Type": "multipart/form-data" } };
        axios.put("/pins/user-changed-board/", formData, config)
        .then(()=>{
            close(true)
        })
    }

    onMounted(()=>{
        getBoards()
        axios.get("/pins/pin-detail/"+props.pin)
        .then((resp)=>{
            let data = resp.data as Pin
            console.log(data)
            pin.value = data
            namePin.value = pin.value.name
            description.value = pin.value.description
        })
    })

    return {
      close,
      closeMenuBoard,
      update,
      props,
      namePin,
      description,
      model,
      boards,
      addBoard,
    };
  },
  components:{
      AddBoardMenu,
  }
});
</script>

<style></style>
