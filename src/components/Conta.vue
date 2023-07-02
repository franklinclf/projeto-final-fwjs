<script setup>
import { ref, watch } from 'vue';

let { pedidos, numero, total } = defineProps(['pedidos', 'numero', 'total']);

defineEmits(['adicionarPedidos', 'emitirConta', 'removerItem']);

</script>

<template>
    <h2>CONTA {{ numero + 1 }}: R$ {{ total }}</h2>
    <div class="container-pedidos">
        <div class="pedido-header">
            <p>NOME</p>
            <p>QTD</p>
            <p>VALOR</p>
        </div>
        <div v-for="pedido in pedidos" class="pedido" @click="$emit('removerItem', {numero, pedido})">
            <p>{{ pedido.nome }}</p>
            <p>{{ pedido.quantidade }}</p>
            <p>R$ {{ (pedido.preco).toFixed(2) }}</p>
        </div>
    </div>
    <div class="opcoes">
        <div style="border-radius: 0 0 0 0.5vw;" @click="$emit('adicionarPedidos')">ADICIONAR PEDIDOS</div>
        <div style="border-radius: 0 0 0.5vw 0;" @click="$emit('emitirConta')">EMITIR CONTA</div>
    </div>
</template>

<style scoped>

.container-pedidos {
    display: flex;
    flex-direction: column;
    background-color: #c1c1c1;
    border-radius: 0.5vw 0.5vw 0 0;
    width: 95%;
    min-height: 30vh;
    max-height: 30vh;
    overflow: auto;
}

.pedido {
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
    align-items: center;
}

.pedido:hover {
    cursor: pointer;
    background-color: #adadad;
}

.pedido-header {
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
    font-weight: 700;
}

.opcoes {
    width: 95%;
    min-height: 4vh;
    display: flex;
    border-radius: 0 0 0.5vw 0.5vw;
    margin-bottom: 2vh;
    justify-content: space-around;
}

.opcoes div {
    display: flex;
    background-color: #adadad;
    height: 100%;
    width: 50%;
    justify-content: center;
    align-items: center;
}

.opcoes div:hover {
    cursor: pointer;
    background-color: #8f8f8f;
}
</style>