<script setup>
import { inject, ref, watch} from 'vue';

let { patio } = inject('patio');
let mesa = ref(1);
let mesaSelecionada = ref(false);

function handleSelection(numerodaMesa) {
    mesa.value = numerodaMesa;
    mesaSelecionada.value = true;
}

</script>

<template>
    <div v-if="!mesaSelecionada">
        <h1>ESCOLHA UMA MESA:</h1>
        <div class="listaDeMesas">
            <div v-for="(mesa, i) in patio" :key="i + 1" class="mesa" @click="handleSelection(i)">Mesa {{ i + 1 }}</div>
        </div>
    </div>

    <div v-if="mesaSelecionada">
        <div class="container-conta">
            <div class="titulo">
                <button @click="mesaSelecionada = false">VOLTAR</button>
                <h1>CONTA DA MESA {{ mesa + 1 }}: R$ {{ patio[mesa].conta.toFixed(2) }}</h1>
            </div>
            <div class="lista-pedidos">
                <div class="header">
                    <p>ITEM</p>
                    <p>QUANTIDADE</p>
                    <p>VALOR</p>
                    <p>HORÁRIO</p>
                </div>
                <h1 v-if="patio[mesa].pedidos.length === 0">MESA SEM PEDIDOS</h1>
                <div v-for="item in patio[mesa].pedidos" v-if="item.status !== 'cancelado'" class="item">
                    <p>{{ item.nome }}</p>
                    <p style="text-align: center">{{ item.quantidade }}</p>
                    <p>R$ {{ item.preco.toFixed(2) }}</p>
                    <p>{{ item.horario}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
    font-size: 2vw;
}
.listaDeMesas {
    height: 75vh;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    margin: 0 10vw 0vw 10vw;
    gap: 2vw;
    overflow: auto;
}

.mesa {
    font-size: 1vw;
    width: 15vw;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0px 0px 1px 1px #c8c8c8;
}

.mesa:hover {
    cursor: pointer;
    background-color: #c8c8c8;
}

.titulo {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2vw;
}

.container-conta {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.header {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr;
}

.header p {
    font-weight: 700;
}
.lista-pedidos {
    display: flex;
    flex-direction: column;
    width: 50vw;
    height: 75vh;
    overflow: auto;
}

.item {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    width: 100%;
    height: 10vh;
    justify-content: space-between;
    align-items: center;
}

.item:hover {
    background-color: #c1c1c1;
}
</style>