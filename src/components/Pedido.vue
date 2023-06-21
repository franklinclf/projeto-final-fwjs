<script setup>
let { nome, preco, quantidade, status, horario} = defineProps(['anotado'])

</script>

<template>
    <div class="container-pedidos">
        <div>{{ anotado.nome }} ({{ anotado.quantidade }})</div>
        <div>R$ {{ anotado.preco.toFixed(2) }}</div>
    </div>
</template>

<style scoped>
.container-pedidos {
    height: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
}

.container-pedidos:hover {
    cursor: pointer;
    background-color: #c1c1c1;
}

</style>