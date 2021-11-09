<template>
    <div class="fixed-center">
        <div class="q-my-lg">Вы на сайте</div>
        <q-btn v-if="isLogedIn.value" @click="login()" label="Войти" type="submit" color="orange" />
        <q-btn v-else @click="logout()" label="Выйти" type="submit" color="orange" />
    </div>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity'
import router from '@/router'
import { useStore } from 'vuex'
export default {
    setup(){
        const store = useStore()
        const isLogedIn = ref<boolean>(store.getters.isLoggedIn)
        function login(){
            router.push('/login')
        }
        function logout(){
            store.dispatch("logout")
            .then(()=> router.push('/login'))
        }
        return{
            isLogedIn,
            login,
            logout
        }
    }
}
</script>

<style>

</style>