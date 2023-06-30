<template>
    <div>
        <Comp v-model:first-name="first" v-model:last-name="last"/>
        {{first}}<br>{{last}}
    </div>
    
</template>
<script setup lang="tsx">
    import { ref } from 'vue';
    import Comp from './comp.vue'
    let first = ref('');
    let last = ref('');
</script>