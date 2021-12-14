<template>
  <div class="main">
    <div class="container">
      <q-card class="my-card" v-for="card in cards" :key="card.id" >
        <figure >
          <div class="card-body" @click="this.$router.push({name: 'Pin', params: {id: card.id}})">
            <q-img :src="card.image" class="card-img" />
          </div>
          <q-card-actions align="left">
            <div class="text-h5">{{card.name}}</div>
          </q-card-actions>
        </figure>
      </q-card>
    </div>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { onMounted } from '@vue/runtime-core';
interface Card {
  id: number,
  name: string,
  image: string
}

export default {
  setup() {
    const store = useStore();
    const isLogedIn = ref<boolean>(store.getters.isLoggedIn);
    const cards = ref<Array<Card>>();

    onMounted(()=> {
      axios.get('/pins/pins/')
      .then(resp => {
        var data = resp.data as Array<Card>
        console.log(data)
        cards.value = data
      })
    })

    return {
      isLogedIn,
      cards,
    };
  },
  components: {
  }
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
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
