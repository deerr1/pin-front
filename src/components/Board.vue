<template>
  <q-title v-if="board != undefind" class="border_title row">
    <div class="row">
    <q-icon class="self-center q-mr-lg" size="30px" :name="board?.access==1?'lock':'lock_open'" />
    <h4>{{ board?.name }}</h4>
    </div>
    <q-btn
      v-if="board?.isYou"
      flat
      dense
      size="20px"
      color="orange"
      icon="settings"
      id="btn-set"
      @click="setting = true"
    />
  </q-title>
  <q-separator />
  <div v-if="board?.isYou && pins?.length > 0" class="row justify-center">
    <q-btn class="col-2 q-my-lx" color="orange" icon="add" label="Добавить" @click="addPin=true" />
  </div>
  <div class="main">
    <div v-if="(board?.isYou==false && board?.access == 1) || board == undefind" class="text-center text-h3" style="width: 80vw">
        Такой доски нет
      </div>
      <div v-else-if="pins?.length == 0" class="row justify-center text-h3" style="">
       <div class="text-center col-12">
         Здесь еще нет картинок
       </div>
       <div v-if="board?.isYou">
        <q-btn color="orange" icon="add" label="Добавить" @click="addPin=true"/>
       </div>
      </div>
    <div v-if="pins?.length > 0" class="container">
      <q-card class="my-card" v-for="pin in pins" :key="pin.pin.id">
        <figure>
          <div
            class="card-body"
            @click="
              this.$router.push({ name: 'Pin', params: { id: pin.pin.id } })
            "
          >
            <q-img :src="pin.pin.image" class="card-img" />
          </div>
          <q-card-actions class="row justify-around">
            <div class="text-h5">{{ pin.pin.name }}</div>
            <q-btn v-if="board?.isYou" color="orange" icon="edit" label="Изменить" @click="showPin(pin.pin.id)" />
          </q-card-actions>
        </figure>
      </q-card>
    </div>
  </div>
  <EditPin :editPin="editPin" :pin="pin" :board="props.id" :key="editPin" @close="closePin"></EditPin>
  <AddPin :addPin="addPin" :board="props.id" @close="closePin"></AddPin>
  <SettingBoard :setting="setting" :board="props.id" @close="closeSetting" :key="board"></SettingBoard>
</template>
<script lang="ts">
import { ref } from "@vue/reactivity";
import router from "@/router";
import { useStore } from "vuex";
import Header from "../components/Header.vue";
import EditPin from "../components/EditPin.vue";
import AddPin from "../components/AddPinMenu.vue";
import SettingBoard from "../components/SettingBoard.vue";
import { defineComponent, onMounted, PropType } from "@vue/runtime-core";
import axios from "axios";
import { useRoute } from "vue-router";

interface Card {
  id: number;
  name: string;
  image: string;
}

interface Pin {
  pin: Card;
}
interface Board {
  id: number;
  name: string;
  access: string;
  img: string;
  isYou: string;
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
    const editPin = ref<boolean>(false);
    const pin = ref<number>();
    const addPin = ref<boolean>(false);
    const setting = ref<boolean>(false);
    const store = useStore()

    function showPin(pinId: number){
      pin.value = pinId
      editPin.value = true
    }

    function closePin(action: boolean) {
      editPin.value = false;
      addPin.value = false;
      if (action == true){
        getPins()
      }
    }

    function closeSetting(action: boolean, del: boolean) {
      setting.value = false
      if(del){
        router.push({name:'Profile', params:{username: store.getters.user}})
      }
      else if(action){
        getBoardDetatil()
      }
    }

    function getPins() {
      axios.get("/pins/pins-on-board/" + props.id).then((resp) => {
        var data = resp.data as Array<Pin>;
        pins.value = data;
      });
    }

    function getBoardDetatil() {
      axios.get("/pins/user-board-detail/" + props.id).then((resp) => {
        var data = resp.data as Board;
        board.value = data;
      });
    }

    onMounted(() => {
      getBoardDetatil()
      getPins()
    });

    return {
      pins,
      board,
      editPin,
      pin,
      props,
      addPin,
      setting,
      closePin,
      showPin,
      closeSetting,
    };
  },
  components: {
    Header,
    EditPin,
    AddPin,
    SettingBoard
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
