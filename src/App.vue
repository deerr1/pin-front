<template>
  <Header :key="$store.getters.user"/>
  <div>
    <router-view :key="$route.path"/>
  </div>
</template>

<script lang="ts">
import Header from "./components/Header.vue";

export default {
  setup() {
    return {};
  },
  components:{
    Header,
  },
};
</script>
