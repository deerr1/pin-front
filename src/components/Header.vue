<template>
  <div>
    <q-toolbar class="bg-black text-white" :shrink=true>
      <q-toolbar-title class="row spase-around" id="title">
        <img src="../img/logo.png" id="logo"/>
        <q-btn rounded outlined class="row text-orange" color="black" icon="home" label="Главная"  id="btn-main" @click="this.$router.push('/')" />
      </q-toolbar-title>
      <div class="absolute-center" id="search">  
          <q-input id="search" rounded outlined v-model="text" bg-color="white" label="Поиск пинов" :dense=true>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
      </div>
      <q-btn class="text-orange" color="black" icon="forum" @click="this.$router.push('Chat')"/>
      <q-btn class="text-orange" color="black" icon="notifications" @click="onClick"/>
      <q-btn class="text-orange" color="black" icon="person" @click="onClick"/>
    </q-toolbar>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style>
#title{
  width: 300px;
  margin: 7px;
}
#logo{
  width: 40px;
  height: 40px;
  margin-left: 15px;
}
#btn-main{
  margin-left: 15px;
}
#search{
  width: 1000px;
}
</style>
