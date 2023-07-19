<script setup>
import { ref, inject, watch } from 'vue';

let { patio } = inject('patio')
let mesas = ref(true)
let mesaSelecionada = ref(0)

function handleSelection(mesa) {
    mesaSelecionada.value = mesa - 1;
    mesas.value = false;
}

function handleStatus(item, event) {
    item.status = event.target.value;
}

watch(patio.value, () => {
    let conta = 0;
    let mesa = patio.value[mesaSelecionada.value];

    for(let i = 0; i < mesa.pedidos.length; i++){
        if(mesa.pedidos[i].status !== "cancelado")
        conta += mesa.pedidos[i].preco;
    }

    mesa.conta = conta;

})

</script>

<template>
    <div class="container-pagina">
        <div v-if="mesas" class="container-mesas">
            <h1>ESCOLHA UMA MESA:</h1>
            <div class="lista-de-mesas">
                <div class="mesa" v-for="i in patio.length" @click="handleSelection(i)">
                    Mesa {{ i }}
                </div>
            </div>
        </div>

        <div v-else class="container-pedido">

            <div class="pedido-titulo">
                <button @click="mesas = true">VOLTAR</button>
                <h1>CONTA DA MESA {{ mesaSelecionada + 1 }}: R$ {{ patio[mesaSelecionada].conta.toFixed(2) }}</h1>
            </div>

            <div class="pedido-items">
                <div class="pedido-header">
                    <p>ITEM</p>
                    <p>QUANTIDADE</p>
                    <p>VALOR</p>
                    <p>HORÁRIO</p>
                    <p>STATUS</p>
                </div>

                <h1 v-if="patio[mesaSelecionada].pedidos.length === 0">MESA SEM PEDIDOS</h1>
                
                    <div v-for="item in patio[mesaSelecionada].pedidos" class="pedido-item">
    
                        <p>{{ item.nome }}</p>
                        <p>{{ item.quantidade }}</p>
                        <p>R$ {{ item.preco.toFixed(2) }}</p>
                        <p>{{ item.horario }}</p>
    
                        <select v-if="!patio[mesaSelecionada].emitida" @change="handleStatus(item, $event)" :value="item.status" :key="item.id">
                            <option value="preparo">Em preparo</option>
                            <option value="entregue">Entregue</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                        <p v-else>{{ item.status }}</p>

                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.container-mesas {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.lista-de-mesas {
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

.pedido-titulo {
    display: flex;
    align-items: center;
    gap: 10px;
}

.container-pedido {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.pedido-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80vh;
    overflow: auto;
}

.pedido-header {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
    gap: 10px;
}

.pedido-header p {
    font-weight: 700;
}

.pedido-item {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
    gap: 10px;
    width: 100%;
    height: 10vh;
    align-items: center;
}

.pedido-item:hover {
    background-color: #c1c1c1;
}

</style>