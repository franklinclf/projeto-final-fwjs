<script setup>
import { defineProps } from 'vue';

let {nome, tipo, preco} = defineProps(['info']);

</script>

<template>
    <div>
        {{ info.nome }}
        <p>----------</p>
    </div>
</template>

<style scoped>

</style>