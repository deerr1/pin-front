<template>
  <div class="main">
    <div class="container">
      <q-card class="my-card" v-for="card in cards" :key="card.id" >
        <figure >
          <!-- <q-img :src="card.img" alt="A windmill" class="card-img"/> -->
          <div class="card-body" @click="this.$router.push({name: 'Pin', params: {id: card.id}})">
            <q-img :src="card.image" class="card-img" />
          </div>
          <q-card-actions align="right">
            <q-btn flat round color="red" icon="favorite" />
            <q-btn flat round color="teal" icon="bookmark" />
            <q-btn flat round color="primary" icon="share" />
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
  width: 340px;
}
.my-card:hover {
  background: #1c1c1c;
  cursor: pointer;
  width: 350px;
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
