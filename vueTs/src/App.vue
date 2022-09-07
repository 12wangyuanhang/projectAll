<template>
    <!-- <div class="dark"> -->
        <router-view></router-view>
    <!-- </div> -->
</template>


<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref } from 'vue';

</script>


<style lang="scss">
#app {
    height: 100%;
    width: 100%;
}

.waves-ripple {
    position: absolute;
    border-radius: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    background-clip: padding-box;
    pointer-events: none;
    user-select: none;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
    opacity: 1;
}

.waves-ripple.z-active {
    opacity: 0;
    -webkit-transform: scale(2);
    -ms-transform: scale(2);
    transform: scale(2);
    transition: opacity 1.2s ease-out, transform 0.6s ease-out;
}
* {
    margin: 0;
    padding: 0;
}

html,body {
    height: 100%;
    width: 100%;
}
</style>
