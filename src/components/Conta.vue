<script setup>
import { ref, watch } from 'vue';

let { pedidos, numero, total, status } = defineProps(['pedidos', 'numero', 'total', 'status']);
let valorTotal = ref(0);

const emit = defineEmits(['adicionarPedidos', 'emitirConta', 'removerItem', 'mudarStatus']);

</script>

<template>
    <div class="conta-titulo">
        <h2 :class="{pendente: status === 'pendente', pago: status === 'pago'}">CONTA {{ numero + 1 }}</h2>
        <select v-if="status != ''" :value="status" @change="$emit('mudarStatus', {$event, numero})">
            <option value="pendente">PENDENTE</option>
            <option value="pago">PAGO</option>
        </select>
    </div>
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
        <button style="border-radius: 0 0 0 0.5vw;" @click="$emit('adicionarPedidos')" :disabled="status != ''">ADICIONAR PEDIDOS</button>
        <button style="border-radius: 0 0 0.5vw 0;" @click="$emit('emitirConta')" :disabled="status != ''">EMITIR CONTA</button>
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

.conta-titulo {
    display: flex;
    align-items: center;
    gap: 1vw;
}

.pendente {
    color: red;
}

.pago {
    color: green;
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

.opcoes button {
    border: none;
    display: flex;
    background-color: #adadad;
    height: 100%;
    width: 50%;
    justify-content: center;
    align-items: center;
}

.opcoes button:hover {
    cursor: pointer;
    background-color: #8f8f8f;
}
</style>