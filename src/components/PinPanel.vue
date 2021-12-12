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
    <div class="row justify-between col-8 self-center">
      <q-select
        class="col-5"
        v-model="model"
        :options="options"
        label="Доска"
        outlined
        @input="
          (val) => {
            return val.name;
          }
        "
      >
        <template v-slot:option="{ itemProps, opt, toggleOption }">
          <q-item v-bind="itemProps" clickable @click="toggleOption(opt.name)">
            <q-item-section>
              <q-item-label >{{opt.name}}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon v-if="opt.close" name="lock" />
              <q-icon v-else name="lock_open" />
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:after-options>
          <q-btn icon="add"  class="full-width" label="Добавить доску" />
        </template>
      </q-select>
      <q-btn
        class="col-5 q-mr-lg"
        color="orange"
        unelevated
        rounded
        label="Сохранить"
        @click="onClick"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { exportFile } from "quasar";
import { uid } from "quasar";
import { copyToClipboard } from "quasar";
import { defineComponent, PropType, ref } from "@vue/runtime-core";
import axios from "axios";

interface Board {
  name: string;
  close: boolean;
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
  },
  setup(props) {
    const options = ref<Array<Board>>([
      { name: "Open", close: false } as Board,
      { name: "close", close: true } as Board,
    ]);
    const model = ref<string|null>(null);

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
        alert("Ссылка скопирвоана");
      });
    }

    return {
      download,
      copy,
      model,
      options,
    };
  },
});
</script>

<style></style>
