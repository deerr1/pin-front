<template>
  <!-- Тут работа над аватаром и кнопкой настроек -->
  <div class="avatar">
    <q-avatar style="width: 200px; height: 200px">
      <img
        src="https://www.factroom.ru/wp-content/uploads/2019/06/10-faktov-o-evgenii-ponasenkove-kotoryj-svodit-vsekh-s-uma-1250x883.jpg"
      />

      <!-- name там имя иконки надо писать -->
      <q-btn
        flat
        round
        class="absolute all-pointer-events"
        size="18px"
        name="settings"
        background="black"
        style="top: 8px; left: 200px"
        icon="settings"
        @click="this.$router.push('Settings')"
      />
    </q-avatar>
  </div>
  <!-- Тут работа над аватаром и кнопкой настроек -->

  <!-- Тут блок с почтой, именим, подпиской и соц сетями. -->
  <div class="NameProfile">
    <h4>{{ NameProfile }}</h4>
  </div>
  <div class="info" style="max-width: 100%">
    <div class="mail">
      <div color="black" flat class="q-ml-sm">
        {{ mail }}
      </div>
    </div>

    <div class="Profilinf">
      <div class="AnotherUsers">
        <div class="Subscribers">{{ Subscribers }} подпичиков</div>
        <div class="Subscriptions">{{ Subscriptions }} подписок</div>
      </div>
    </div>

    <div class="q-pa-md">
      <div class="Links">
        <a :href="vk"><img src="../img/vk.png" /></a>
        <a :href="fb"><img src="../img/fb.png" /></a>
      </div>
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
          <q-tab name="saved" label="Сохраненные доски" />
          <q-tab name="subscribed" label="Мои подписки" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="borders">
            <div class="Button">
              <q-btn round color="orange" icon="add"></q-btn>

              <q-btn-dropdown
                round
                color="orange"
                dropdown-icon="sorted"
                label="Сортировать"
              >
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>В алфавитном порядке</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Последнее сохраненая</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="folders">
              <q-card class="folder" @click="this.$router.push('Board')">
                <q-img src="https://cdn.quasar.dev/img/parallax1.jpg">
                  <div class="absolute-bottom text-subtitle1 text-center">Saved pins</div>
                </q-img>
              </q-card>
              <q-card class="folder" @click="this.$router.push('Board')">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                  <div class="absolute-bottom text-subtitle2 text-center">
                    Новая папка
                  </div>
                </q-img>
              </q-card>
            </div>
          </q-tab-panel>

          <q-tab-panel name="saved">
            <q-btn-dropdown
              class="bottom-right q-ma-md"
              label="Сортировать"
              round
              color="orange"
              dropdown-icon="sorted"
            >
              <q-list>
                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>В алфавитном порядке</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Последнее сохраненая</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-tab-panel>

          <q-tab-panel name="subscribed"> </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
  data() {
    return {
      tab: ref("borders"),
      mail: "mailbox@mail.com",
      NameProfile: "Евгений Панасенко",
      Subscribers: "10",
      Subscriptions: "10",
      vk: "http://vk.com",
      fb: "http://facebook.com",
    };
  },
  components: {

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
