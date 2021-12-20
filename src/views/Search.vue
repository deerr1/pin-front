<template>
  <div v-if="len == 0" class="text-h4 absolute-center">
    По данному запросу ничего не найдено
  </div>
  <div v-else class="main">
    <div class="container">
      <q-card class="my-card" v-for="card in cards" :key="card.id">
        <figure>
          <div class="card-body" @click="this.$router.push({name: 'Pin', params: {id: card.id}})">
            <q-img :src="card.image" class="card-img" />
          </div>
        </figure>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "@vue/runtime-core";
import axios from "axios";

interface Card {
  id: number;
  name: string;
  image: string;
  description: string;
  board: Array<number>;
}

export default defineComponent({
  props: {
    searchString: {
      required: true,
      type: Object as PropType<string>,
    },
  },
  setup(props) {
    const cards = ref<Array<Card>>();
    const len = ref<number>()

    function sortedData(item: Card) {
      if (item.board.length>0 && item.board.indexOf(1) == -1) {
        return true;
      } else {
        return false;
      }
    }

    onMounted(() => {
      axios
        .get("/search_indexes/pin/?search_multi_match=" + props.searchString)
        .then((resp) => {
          let data = resp.data as Array<Card>;
          data = data.filter(sortedData);
          for (var i = 0; i < data.length; i++) {
            data[i].image = axios.defaults.baseURL?.toString().substring(0, axios.defaults.baseURL?.toString().length - 5) + data[i].image;
          }
          cards.value = data;
          len.value = data.length
          console.log(len.value)
        });
    });

    return {
      cards,
      len
    };
  },
});
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
