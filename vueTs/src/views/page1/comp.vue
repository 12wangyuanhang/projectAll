<template>
    <el-input
        :model-value="firstName"
        @input="$emit('update:firstName', $event.target.value)"
    />
    <el-input
        :model-value="lastName"
        @input="$emit('update:lastName', $event.target.value)"
    />
</template>

<script lang="tsx" setup>
    import { defineEmits, defineProps } from 'vue';
    defineProps({
        firstName: String,
        lastName: String
    })
    defineEmits(['update:firstName', 'update:lastName'])
</script>

<style>

</style>