<template>
  <q-dialog v-model="props.addPin" persistent >
    <q-card class="column" style="width:70vw; height:70vh">
        <q-form @submit="addBoard" @reset="close(false)" class="q-mt-lg">
          <div class="text-center text-h5">Добавление пина</div>
          <div class="row justify-between q-mx-lg">
              <div class="col-5">
                  <q-file
                    label="Фотография"
                  >
                  <template v-slot:append>
                      <q-icon name="attachment" color="orange" />
                  </template>
                  </q-file>
              </div>
              <div>sa</div>
          </div>
          <div class="q-mx-lg">
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
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  props: {
    addPin: {
      required: true,
      type: Object as PropType<boolean>,
    },
  },
  setup(props, { emit }) {
    function close(action: boolean) {
      emit("close", action);
    }

    return {
      props,
      close,
    };
  },
});
</script>

<style></style>
