<template>
  <Header />
  <q-title class="border_title">
    <h4>{{ border_name }}</h4>
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
      <q-card class="my-card" v-for="card in cards">
        <figure>
          <!-- <q-img :src="card.img" alt="A windmill" class="card-img"/> -->
          <div class="card-body">
            <q-img :src="card.img" class="card-img" />
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
import { ref } from "@vue/reactivity";
import router from "@/router";
import { useStore } from "vuex";
import Header from "../components/Header.vue";
export default {
  data() {
    return {
      border_name: "Название доски",
      cards: [
        {
          img: "https://img2.fonwall.ru/o/pe/amazing-beautiful-flower-great.jpeg",
        },
        {
          img:
            "https://i.pinimg.com/originals/d1/83/11/d18311078597aeffbe130b3f46d9d26d.jpg",
        },
        {
          img:
            "https://i.pinimg.com/736x/97/24/4e/97244edceeb639be45ec4c2ec541d4eb--beautiful-butterflies-beautiful-flowers.jpg",
        },
        {
          img: "https://pbs.twimg.com/media/Es4wO0hXUAA6K0s.jpg",
        },
        {
          img:
            "http://1.bp.blogspot.com/-VEoqyiw7rt8/VYXdx74_kzI/AAAAAAAEkWc/S_HOPYidFos/s1600/Zbigniew%2BKopania%2BTutt%2527Art%2540-%2B%252860%2529.jpg",
        },
        {
          img:
            "https://www.nastol.com.ua/download.php?img=201701/1920x1200/nastol.com.ua-201978.jpg",
        },
        {
          img: "https://i.pinimg.com/736x/e2/0c/91/e20c9175e3b4192dc94ceb803009e924.jpg",
        },
        {
          img:
            "https://i.pinimg.com/originals/2b/d2/cf/2bd2cfbd44e4525b7709f07673df14df.jpg",
        },
        {
          img: "https://img2.fonwall.ru/o/pe/amazing-beautiful-flower-great.jpeg",
        },
        {
          img:
            "https://i.pinimg.com/originals/d1/83/11/d18311078597aeffbe130b3f46d9d26d.jpg",
        },
        {
          img:
            "https://i.pinimg.com/736x/97/24/4e/97244edceeb639be45ec4c2ec541d4eb--beautiful-butterflies-beautiful-flowers.jpg",
        },
        {
          img: "https://pbs.twimg.com/media/Es4wO0hXUAA6K0s.jpg",
        },
        {
          img:
            "http://1.bp.blogspot.com/-VEoqyiw7rt8/VYXdx74_kzI/AAAAAAAEkWc/S_HOPYidFos/s1600/Zbigniew%2BKopania%2BTutt%2527Art%2540-%2B%252860%2529.jpg",
        },
        {
          img:
            "https://www.nastol.com.ua/download.php?img=201701/1920x1200/nastol.com.ua-201978.jpg",
        },
        {
          img: "https://i.pinimg.com/736x/e2/0c/91/e20c9175e3b4192dc94ceb803009e924.jpg",
        },
        {
          img:
            "https://i.pinimg.com/originals/2b/d2/cf/2bd2cfbd44e4525b7709f07673df14df.jpg",
        },
        {
          img: "https://pbs.twimg.com/media/Es4wO0hXUAA6K0s.jpg",
        },
        {
          img:
            "http://1.bp.blogspot.com/-VEoqyiw7rt8/VYXdx74_kzI/AAAAAAAEkWc/S_HOPYidFos/s1600/Zbigniew%2BKopania%2BTutt%2527Art%2540-%2B%252860%2529.jpg",
        },
        {
          img:
            "https://www.nastol.com.ua/download.php?img=201701/1920x1200/nastol.com.ua-201978.jpg",
        },
        {
          img: "https://i.pinimg.com/736x/e2/0c/91/e20c9175e3b4192dc94ceb803009e924.jpg",
        },
        {
          img:
            "https://i.pinimg.com/originals/2b/d2/cf/2bd2cfbd44e4525b7709f07673df14df.jpg",
        },
        {
          img: "https://pbs.twimg.com/media/Es4wO0hXUAA6K0s.jpg",
        },
        {
          img:
            "http://1.bp.blogspot.com/-VEoqyiw7rt8/VYXdx74_kzI/AAAAAAAEkWc/S_HOPYidFos/s1600/Zbigniew%2BKopania%2BTutt%2527Art%2540-%2B%252860%2529.jpg",
        },
        {
          img:
            "https://www.nastol.com.ua/download.php?img=201701/1920x1200/nastol.com.ua-201978.jpg",
        },
        {
          img: "https://i.pinimg.com/736x/e2/0c/91/e20c9175e3b4192dc94ceb803009e924.jpg",
        },
        {
          img:
            "https://i.pinimg.com/originals/2b/d2/cf/2bd2cfbd44e4525b7709f07673df14df.jpg",
        },
      ],
    };
  },
  components: {
    Header,
  },
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

