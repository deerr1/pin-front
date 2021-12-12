<template>
  <div class="row justify-center q-mt-lg items-stretch">
    <div class="column relative-position absilute-center shadow-3 col-7">
      <div class="row justify-between" style="width: 100%">
        <q-img :src="pin?.image" class="card-img col-6" style="" />
        <div class="row col-6">
          <PinPanel
            :file="pin?.image"
            :link="path"
            class="col-12 q-mx-sm"
          ></PinPanel>
          <div class="column q-mx-sm col-12">
            <div class="self-center q-my-sm text-h5">{{ pin?.name }}</div>
            <div class="text-body1 q-my-sm">{{ pin?.description }}</div>
            <div class="q-my-sm">
              {{ new Date(pin?.upload_date).toLocaleDateString("ru-Ru") }}
            </div>
          </div>
          <div class="row col-12 q-mx-xl q-mb-sm self-end">
            <q-avatar class="" size="60px" font-size="60px">
              <img :src="pin?.user.avatar ? pin?.user.avatar : require('../img/noImage.svg.png')" />
            </q-avatar>
            <div class="body-text1 text-weight-bold q-ml-lg self-center col-5">
              {{pin?.user.username}}
            </div>
          </div>
          <!-- <div class="q-mx-xl q-mb-sm self-end">Аккаунт</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import PinPanel from "../components/PinPanel.vue";
import { defineComponent, onMounted, PropType, ref } from "@vue/runtime-core";

interface Category {
  id: number;
  name: string;
}
interface User {
  id: number
  username: string,
  avatar: string
}
interface Pin {
  id: number;
  name: string;
  description: string;
  image: string;
  upload_date: Date;
  category: Array<Category>;
  user: User
}

export default defineComponent({
  props: {
    id: {
      required: true,
      type: Object as PropType<string>,
    },
  },
  setup(props) {
    const pin = ref<Pin>();
    const path = ref<Location>(window.location);
    const avatar = ref<string>("../img/logo.png")

    onMounted(() => {
      axios.get("/pins/pin-detail/" + props.id).then((resp) => {
        var data = resp.data as Array<Pin>;
        pin.value = data[0];
      });
    });

    return {
      pin,
      path,
    };
  },
  components: {
    PinPanel,
  },
});
</script>

<style scoped></style>
