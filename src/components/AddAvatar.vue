<template>
  <q-dialog v-model="props.addAvatar" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-form @submit="setAvatar" @reset="close(false)" class="q-gutter-md">
          <div class="text-center text-h5">Смена аватара</div>
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
            <template v-slot:list="scope">
              <q-list separator>
                <q-item :v-if="scope.files.length>0" v-for="file in scope.files" :key="file.name">
                  <q-img
                    :src="file.__img.src"
                    spinner-color="primary"
                    spinner-size="82px"
                    width="20vw"
                  />
                </q-item>
                <q-item v-if="scope.files.length==0">
                    <q-img
                    :src="props.avatar"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                </q-item>
              </q-list>
            </template>
          </q-uploader>
          <div class="row justify-between self-center q-mx-lg q-mt-xl">
            <q-btn
              label="Сохранить"
              type="submit"
              color="orange"
              class="q-mx-sm"
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

export default defineComponent({
  props: {
    addAvatar: {
      required: true,
      type: Object as PropType<boolean>,
    },
    avatar: {
      required: true,
      type: Object as PropType<boolean>,
    },
  },
  setup(props, { emit }) {
    const selectedFile = ref()

    function close(action: Boolean) {
      emit("close", action);
    }

    function fileSelected(file: any) {
      selectedFile.value = file[0];
      // console.log(selectedFile.value)
    }

    function setAvatar() {
        let data = new FormData()
        data.append("avatar", selectedFile.value)
        let config = { headers: { "Content-Type": "multipart/form-data" } };
        axios.put("/users/user-change/", data, config)
        .then(()=>{
            close(true)
        })
    }

    onMounted(() => {});
    return {
      props,
      selectedFile,
      close,
      setAvatar,
      fileSelected
    };
  },
});
</script>

<style></style>
