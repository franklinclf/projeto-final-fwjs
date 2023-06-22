<script setup>

let { pedidos, numero } = defineProps(['pedidos', 'numero']);
defineEmits(['adicionarItens', 'emitirConta']);

</script>

<template>
    <h2>CONTA {{ numero }}</h2>
    <div class="container-pedidos">
        <div v-for="pedido in pedidos" class="pedido">
            <p>{{ pedido.nome }}</p>
            <p>{{ pedido.quantidade }}</p>
            <p>{{ pedido.preco }}</p>
        </div>
    </div>
    <div class="opcoes">
        <div style="border-radius: 0 0 0 0.5vw;" @click="$emit(adicionarItens)">ADICIONAR PEDIDOS</div>
        <div style="border-radius: 0 0 0.5vw 0;" @click="$emit(emitirConta)">EMITIR CONTA</div>
    </div>
</template>

<style scoped>

.container-pedidos {
    display: flex;
    flex-direction: column;
    background-color: #c1c1c1;
    border-radius: 0.5vw 0.5vw 0 0;
    width: 90%;
    min-height: 30vh;
    max-height: 30vh;
    overflow: auto;
}

.pedido {
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
}

.opcoes {
    width: 90%;
    height: 4vh;
    display: flex;
    background-color: red;
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