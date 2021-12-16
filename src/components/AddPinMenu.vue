<template>
  <q-dialog v-model="props.addPin" persistent>
    <q-card class="column" style="width: 70vw; height: 55vh">
      <q-form
        @submit="pinCreate"
        @reset="close(false)"
        class="column justify-around q-mt-lg"
      >
        <div class="text-center q-mb-lg text-h5">Добавление пина</div>
        <div class="row justify-between q-mx-lg" style="height: 30vh">
          <div class="col-5 column justify-between">
            <!-- <q-card>
              <q-img v-if="imageUrl" :src="imageUrl" width="100%" />
            </q-card> -->
            <q-uploader
              class="col-12"
              color="orange"
              flat
              accept=".jpg, image/*"
              bordered
              @added="fileSelected"
            >
              <template v-slot:header="scope">
                <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                  
                  <q-btn
                    v-if="scope.uploadedFiles.length > 0"
                    icon="done_all"
                    @click="scope.removeUploadedFiles"
                    round
                    dense
                    flat
                  >
                    <q-tooltip>Remove Uploaded Files</q-tooltip>
                  </q-btn>
                  <q-spinner
                    v-if="scope.isUploading"
                    class="q-uploader__spinner"
                  ></q-spinner>
                  <div class="col">
                    <div class="q-uploader__title">Загрузите фотографию</div>
                  </div>
                  <q-btn
                    v-if="scope.canAddFiles"
                    type="a"
                    icon-right="add"
                    dense
                    flat
                  >
                    <q-uploader-add-trigger></q-uploader-add-trigger>
                    <q-tooltip>Загрузить</q-tooltip>
                  </q-btn>
                  <q-btn
                    v-if="scope.queuedFiles.length > 0"
                    icon="clear"
                    @click="scope.removeQueuedFiles"
                    round
                    dense
                    flat
                  >
                    <q-tooltip>Очистить выбор</q-tooltip>
                  </q-btn>
                </div>
              </template>
              <template>
              </template>
            </q-uploader>
          </div>
          <div class="col-6">
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
        <div class="row self-center q-mx-lg q-mt-xl">
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
    </q-card>
  </q-dialog>
  <AddBoardMenu :addBoard="addBoard" @closes="closeMenu"></AddBoardMenu>
</template>

<script lang="ts">
import store from "@/store";
import AddBoardMenu from "./AddBoardMenu.vue";
import { defineComponent, onMounted, PropType, ref } from "@vue/runtime-core";
import axios from "axios";

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
  name: string;
  description: string;
  image: any;
}

interface PinCreate {
  board: number;
  pin: Pin;
}

export default defineComponent({
  props: {
    addPin: {
      required: true,
      type: Object as PropType<boolean>,
    },
  },
  setup(props, { emit }) {
    const filesImages = ref<File | null>(null);
    const imageUrl = ref<string>("");
    const boards = ref<Array<UserBoard>>();
    const namePin = ref<string>();
    const description = ref<string>();
    const model = ref<Board | null>(null);
    const addBoard = ref<boolean>(false);
    const selectedFile = ref();

    function fileSelected(file: any) {
      console.log(file[0]);
      selectedFile.value = file[0];
      // console.log(selectedFile.value)
    }

    function updateFiles(val: any) {
      console.log(val);
      filesImages.value = val;
      if (val == null) {
        imageUrl.value = "";
      } else {
        imageUrl.value = URL.createObjectURL(val);
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

    function pinCreate() {
      let formData = new FormData();
      formData.append("board", "" + model.value?.id);
      formData.append("name", "" + namePin.value);
      formData.append("description", "" + description.value);
      formData.append("image", selectedFile.value);
      var data = formData;
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      axios.post("/pins/pin-create/", data, config).then(() => {
        close(true);
      });
    }

    onMounted(() => {
      getBoards();
    });

    function close(action: boolean) {
      model.value = null;
      filesImages.value = null;
      imageUrl.value = "";
      namePin.value = "";
      description.value = "";
      emit("close", action);
    }

    function closeMenu(action: boolean) {
      addBoard.value = false;
      if (action == true) {
        getBoards();
      }
    }

    return {
      props,
      filesImages,
      imageUrl,
      boards,
      namePin,
      description,
      model,
      addBoard,
      close,
      updateFiles,
      getBoards,
      closeMenu,
      pinCreate,
      fileSelected,
    };
  },
  components: {
    AddBoardMenu,
  },
});
</script>

<style></style>
