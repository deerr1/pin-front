<template>
  <div>
    <!-- dfdsffds -->
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import Header from "./components/Header.vue";
export default {
  name: "LayoutDefault",

  components: {
    Header,
  },

  setup() {
    return {};
  },
};
</script>
