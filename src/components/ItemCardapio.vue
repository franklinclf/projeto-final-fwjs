<script setup>
import { defineProps } from 'vue';

let {nome, tipo, preco} = defineProps(['info']);

</script>

<template>
    <div class="item">
        {{ info.nome }}
    </div>
</template>

<style scoped>
.item {
    padding: 1%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-wrap: break-word;
    box-shadow: 0px 0px 1px 1px #c8c8c8;
}

.item:hover {
    cursor: pointer;
    background-color: #c8c8c8;
}
</style>