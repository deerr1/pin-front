<template>
  <!-- Тут работа над аватаром и кнопкой настроек -->
  <div class="avatar">
    <q-avatar class="" size="200px" font-size="200px">
      <img
        :src="user?.avatar ? user.avatar : require('../img/noImage.svg.png')"
      />
      <!-- name там имя иконки надо писать -->
      <q-btn
      v-if="user?.isYou"
        flat
        round
        class="absolute all-pointer-events"
        size="18px"
        name="settings"
        color="orange"
        style="top: 8px; left: 200px;"
        icon="settings"
        @click="this.$router.push({name:'Settings'})"
      />
    </q-avatar>
  </div>
  <!-- Тут работа над аватаром и кнопкой настроек -->

  <!-- Тут блок с почтой, именим, подпиской и соц сетями. -->
  <div class="NameProfile text-h4">
    {{ user?.username }}
  </div>
  <div class="info" style="max-width: 100%">
    <div class="mail">
      {{ user?.email }}
    </div>
  </div>

  <!-- Тут блок с разделами -->
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 100%">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-black bg-grey-2"
          active-color="orange"
          indicator-color="orange"
          align="justify"
          narrow-indicator
        >
          <q-tab name="borders" label="Мои доски" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="borders">
            <div class="Button">
              <q-btn-dropdown v-if="user?.isYou" round color="orange" icon="add">
                <q-list bordered>
                  <q-item clickable v-ripple @click="addPin=true">
                    <div class="text-body1">
                      <q-icon name="image" color="orange" size="20px"/>
                      Добавить пин
                    </div>
                  </q-item>
                  <q-item clickable v-ripple @click="addBoard=true">
                    <div class="text-body1">
                      <q-icon name="photo_library" color="orange" size="20px"/>
                      Добавить доску
                    </div>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="folders">
              <q-card
                class="folder"
                v-for="board in boards"
                :key="board.board.id"
              >
                <q-img :src="board.board.img" width="100%" height="100%" @click="this.$router.push({name: 'Board', params: {'id': board.board.id}})">
                  <div class="absolute-bottom text-subtitle1 text-center">
                    {{ board.board.name }}
                    <q-icon v-if="board.board.access == 1" name="lock" />
                    <q-icon v-else name="lock_open" />
                  </div>
                </q-img>
              </q-card>
            </div>
          </q-tab-panel>

          <q-tab-panel name="saved"> </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
  <AddBoardMenu :addBoard="addBoard" @closes="closeMenu"></AddBoardMenu>
  <AddPinMenu :addPin="addPin" @close="closePin"></AddPinMenu>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, onMounted, PropType } from "vue";
import AddBoardMenu from "../components/AddBoardMenu.vue"
import AddPinMenu from "../components/AddPinMenu.vue"
import { ref } from "vue";

interface User {
  id: number | null;
  username: string | null;
  email: string | null;
  avatar: string | null;
  isYou: boolean | null;
}

interface Board {
  id: number | null;
  name: string | null;
  access: number | null;
  img: string | null;
}

interface UserBoard {
  user: number ;
  board: Board ;
}

export default defineComponent({
  props:{
    username:{
      required: true,
      type: Object as PropType<string>
    }
  },
  setup(props) {
    const user = ref<User>();
    const boards = ref<Array<UserBoard>>();
    const addBoard = ref<boolean>(false)
    const addPin = ref<boolean>(false)

    function getBoards() {
      axios.get("/pins/user-boards/"+props.username).then((resp) => {
        var data = resp.data as Array<UserBoard>;
        boards.value = data;
      });
    }

    function closeMenu(action: boolean) {
      addBoard.value = false
      if(action==true){
        getBoards()
      }
    }

    function closePin(action: boolean) {
      addPin.value = false
      if(action==true){
        getBoards()
      }
    }

    onMounted(() => {
      axios.get("/users/user-profile/"+props.username).then((resp) => {
        var data = resp.data as User
        user.value = data;
      })
      .then(()=>{
        getBoards()
      })
    });

    return {
      user,
      tab: ref("borders"),
      boards,
      addBoard,
      addPin,
      closeMenu,
      closePin,
    };
  },
  components: {
    AddBoardMenu,
    AddPinMenu
  },
});
</script>

<style scoped>
.avatar {
  display: flex;
  justify-content: center;
  margin: 70px 0px 0px 0px;
}
.info {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}
.NameProfile {
  display: flex;
  justify-content: center;
}
.q-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.q-item__section--main {
  margin: 5px;
  margin-left: 0px !important;
}

.q-gutter-y-md {
  margin: 100px;
  margin-top: 10px !important;
}
/* .q-tab-panel{
    padding: 40px;
  } */

.Button {
  display: flex;
  justify-content: end;
  margin: 0 20px 0 0;
}
.q-pa-md a img {
  width: 40px;
  height: 40px;
  margin-left: 5px;
}
.avatar {
  filter: drop-shadow(10px 10px 5px rgba(0, 0, 0, 0.3));
}
.folder {
  width: 250px;
  height: 167px;
  margin: 10px;
}
.folder:hover {
  width: 255px;
  height: 170px;
  cursor: pointer;
}
.folders {
  display: flex;
}
</style>
