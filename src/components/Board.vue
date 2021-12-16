<template>
  <Header />
  <q-title class="border_title">
    <h4>{{ board?.name }}</h4>
    <q-btn
      flat
      dense
      size="20px"
      color="orange"
      icon="settings"
      id="btn-set"
      @click="this.$router.push('#')"
    />
  </q-title>
  <q-separator />
 <div class="main">
    <div class="container">
      <div v-if="pins==0" class="text-center text-h3" style="width:80vw">Здесь еще нет картинок</div>
      <q-card v-else class="my-card" v-for="pin in pins" :key="pin.pin.id" >
        <figure >
          <div class="card-body" @click="this.$router.push({name: 'Pin', params: {id: pin.pin.id}})">
            <q-img :src="pin.pin.image" class="card-img" />
          </div>
          <q-card-actions align="left">
            <div class="text-h5">{{pin.pin.name}}</div>
          </q-card-actions>
        </figure>
      </q-card>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "@vue/reactivity";
import router from "@/router";
import { useStore } from "vuex";
import Header from "../components/Header.vue";
import { defineComponent, onMounted, PropType } from "@vue/runtime-core";
import axios from "axios";

interface Card {
  id: number;
  name: string;
  image: string;
}

interface Pin{
  pin: Card
}
interface Board{
  id: number,
  name: string,
  access: string
}

export default defineComponent({
  props: {
    id: {
      required: true,
      type: Object as PropType<string>,
    },
  },

  setup(props) {
    const pins = ref<Array<Pin>>();
    const board = ref<Board>();

    onMounted(() => {
      axios.get("/pins/user-board-detail/" + props.id)
      .then((resp)=>{
        var data = resp.data as Array<Board>
        board.value = data[0]
        console.log(data)
      })

      axios.get("/pins/pins-on-board/" + props.id)
      .then((resp)=>{
        var data = resp.data as Array<Pin>
        pins.value = data

        console.log(data)
      })
    });

    return {
      pins,
      board
    };
  },
  components: {
    Header,
  },
});
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  min-height: 500px;
}
.my-card {
  width: 17vw;
}
.my-card:hover {
  cursor: pointer;
  width: 18vw;
  transition: 0.3s;
}
.border_title {
  display: flex;
  justify-content: center;
}
#btn-set {
  margin: 20px;
}

figure {
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 10px;
  break-inside: avoid;
}

figure > img {
  grid-row: 1 / -1;
  grid-column: 1;
}

.container {
  column-count: 4;
  column-gap: 2px;
  width: 75%;
  padding-top: 20px;
}
</style>
