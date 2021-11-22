<template>
    <Header/>
    <div class="main-container absolute-center row">
        <div class="dialogs-container">
        </div>
        <div class="chat-container">
            <div class="msg-container">
                <!-- <div class="q-pa-md row justify-center" id="msg">
                    <div style="width: 100%; max-width: 400px">
                        <q-chat-message
                            :text="['hey, how are you?']"
                            sent
                        />
                        <q-chat-message
                            :text="['doing fine, how r you?']"
                        />
                    </div>
                </div> -->
            </div>
            <div class="text-container">

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Header from '../components/Header.vue'
export default {
    components: {
        Header
    }
}
</script>

<style>
.main-container{
    z-index: -1;
    width: 1200px;
    height: 100%;
    background: white;
    filter: drop-shadow(15px 15px 10px rgba(0, 0, 0, 0.3));
}
.dialogs-container{
    width: 350px;
    background: #E0E0E0;
    height: 100%;
    filter: drop-shadow(15px 15px 10px rgba(0, 0, 0, 0.25));

}
.chat-container{
    width: 850px;
    height: 100%;
}
.text-container{
    width: 100%;
    height: 5%;
    background: #1c1c1c;
}
.msg-container{
    width: 100%;
    height: 95%;
}
#msg{
    padding-top: 750px
}
</style>