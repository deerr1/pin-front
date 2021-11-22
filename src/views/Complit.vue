<template>
    <Header/>
    <div class="container row">
        <div class="column">
            <div class="element-item">
                <q-card class="my-card">
                    <img src="../img/1.jpg">
                    <q-card-actions align="right">
                        <q-btn flat round color="red" icon="favorite" />
                        <q-btn flat round color="teal" icon="bookmark" />
                        <q-btn flat round color="primary" icon="share" />
                    </q-card-actions>
                </q-card>
            </div>
            <div class="element-item">
                <q-card class="my-card">
                    <img src="../img/2.jpg">
                    <q-card-actions align="right">
                        <q-btn flat round color="red" icon="favorite" />
                        <q-btn flat round color="teal" icon="bookmark" />
                        <q-btn flat round color="primary" icon="share" />
                    </q-card-actions>
                </q-card>
            </div>
            <div class="element-item">
                <q-card class="my-card">
                    <img src="../img/3.jpg">
                    <q-card-actions align="right">
                        <q-btn flat round color="red" icon="favorite" />
                        <q-btn flat round color="teal" icon="bookmark" />
                        <q-btn flat round color="primary" icon="share" />
                    </q-card-actions>
                </q-card>
            </div>
        </div>
        <div class="column">
            <div class="element-item">
                <q-card class="my-card">
                    <img src="../img/5.jpg">
                    <q-card-actions align="right">
                        <q-btn flat round color="red" icon="favorite" />
                        <q-btn flat round color="teal" icon="bookmark" />
                        <q-btn flat round color="primary" icon="share" />
                    </q-card-actions>
                </q-card>
            </div>
            <div class="element-item">
                <q-card class="my-card">
                    <img src="../img/3.jpg">
                    <q-card-actions align="right">
                        <q-btn flat round color="red" icon="favorite" />
                        <q-btn flat round color="teal" icon="bookmark" />
                        <q-btn flat round color="primary" icon="share" />
                    </q-card-actions>
                </q-card>
            </div>
            <div class="element-item">
                <q-card class="my-card">
                    <img src="../img/1.jpg">
                    <q-card-actions align="right">
                        <q-btn flat round color="red" icon="favorite" />
                        <q-btn flat round color="teal" icon="bookmark" />
                        <q-btn flat round color="primary" icon="share" />
                    </q-card-actions>
                </q-card>
            </div>
        </div>
        <div class="column">
            <div class="element-item">
                <q-card class="my-card">
                    <img src="../img/2.jpg">
                    <q-card-actions align="right">
                        <q-btn flat round color="red" icon="favorite" />
                        <q-btn flat round color="teal" icon="bookmark" />
                        <q-btn flat round color="primary" icon="share" />
                    </q-card-actions>
                </q-card>
            </div>
            <div class="element-item">
                <q-card class="my-card">
                    <img src="../img/3.jpg">
                    <q-card-actions align="right">
                        <q-btn flat round color="red" icon="favorite" />
                        <q-btn flat round color="teal" icon="bookmark" />
                        <q-btn flat round color="primary" icon="share" />
                    </q-card-actions>
                </q-card>
            </div>
            <div class="element-item">
                <q-card class="my-card">
                    <img src="../img/4.jpg">
                    <q-card-actions align="right">
                        <q-btn flat round color="red" icon="favorite" />
                        <q-btn flat round color="teal" icon="bookmark" />
                        <q-btn flat round color="primary" icon="share" />
                    </q-card-actions>
                </q-card>
            </div>
        </div>
        <div class="column">
            <div class="element-item">
                <q-card class="my-card">
                    <img src="../img/5.jpg">
                    <q-card-actions align="right">
                        <q-btn flat round color="red" icon="favorite" />
                        <q-btn flat round color="teal" icon="bookmark" />
                        <q-btn flat round color="primary" icon="share" />
                    </q-card-actions>
                </q-card>
            </div>
            <div class="element-item">
                <q-card class="my-card">
                    <img src="../img/1.jpg">
                    <q-card-actions align="right">
                        <q-btn flat round color="red" icon="favorite" />
                        <q-btn flat round color="teal" icon="bookmark" />
                        <q-btn flat round color="primary" icon="share" />
                    </q-card-actions>
                </q-card>
            </div>
            <div class="element-item">
                <q-card class="my-card">
                    <img src="../img/2.jpg">
                    <q-card-actions align="right">
                        <q-btn flat round color="red" icon="favorite" />
                        <q-btn flat round color="teal" icon="bookmark" />
                        <q-btn flat round color="primary" icon="share" />
                    </q-card-actions>
                </q-card>
            </div>
        </div>
        <div class="column">
            <div class="element-item">
                <q-card class="my-card">
                    <img src="../img/3.jpg">
                    <q-card-actions align="right">
                        <q-btn flat round color="red" icon="favorite" />
                        <q-btn flat round color="teal" icon="bookmark" />
                        <q-btn flat round color="primary" icon="share" />
                    </q-card-actions>
                </q-card>
            </div>
            <div class="element-item">
                <q-card class="my-card">
                    <img src="../img/4.jpg">
                    <q-card-actions align="right">
                        <q-btn flat round color="red" icon="favorite" />
                        <q-btn flat round color="teal" icon="bookmark" />
                        <q-btn flat round color="primary" icon="share" />
                    </q-card-actions>
                </q-card>
            </div>
            <div class="element-item">
                <q-card class="my-card">
                    <img src="../img/5.jpg">
                    <q-card-actions align="right">
                        <q-btn flat round color="red" icon="favorite" />
                        <q-btn flat round color="teal" icon="bookmark" />
                        <q-btn flat round color="primary" icon="share" />
                    </q-card-actions>
                </q-card>
            </div>
        </div>
        
    </div>
    <!-- <div class="fixed-center"> 
        <div class="q-my-lg">Вы на сайте</div>
        <q-btn v-if="isLogedIn.value" @click="login()" label="Войти" type="submit" color="orange" />
        <q-btn v-else @click="logout()" label="Выйти" type="submit" color="orange" />
    </div> -->
</template>
<script lang="ts">
import { ref } from '@vue/reactivity'
import router from '@/router'
import { useStore } from 'vuex'
import Header from '../components/Header.vue'
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
    },
    components: {
        Header
    }
}
</script>

<style>
#slots {
    margin: 0 auto;
    padding: 30px 0;
    max-width: 1600px;
}
/* Элемент сетки */
.element-item { 
    margin-bottom: 15px;
    padding: 8px;
    width: 320px
}
.container{
    display: flex;
    justify-content: center;
    margin-top: 20px
}
.my-card:hover{
    background: #1c1c1c;
}
</style>