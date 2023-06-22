<script setup>
import { inject, ref, watch } from 'vue';
import Conta from '../components/Conta.vue';

let { patio } = inject('patio');
let mesa = ref(1);
let mesaSelecionada = ref(false);
let divisao = ref(1);
let contas = ref([])

function handleSelection(numerodaMesa) {
    mesa.value = numerodaMesa;
    mesaSelecionada.value = true;
    contas.value = [];
    contas.value.push(dataExtraction(patio.value[mesa.value].pedidos))
    console.log(contas.value)
}

function handleDivisao() {
    contas.value = [];
    for(let i = 0; i < divisao.value; i++){
        contas.value.push({});
    }
}

function dataExtraction(pedidos) {
    let temp = [];

    for (let i = 0; i < pedidos.length; i++) {
        let encontrado = temp.find(pedido => pedido.nome === pedidos[i].nome);

        if(encontrado) {
            encontrado.quantidade += pedidos[i].quantidade;
            encontrado.preco += pedidos[i].preco;
        }
        else if(pedidos[i].status !== 'cancelado') {
            let novoItem = {
                nome: pedidos[i].nome,
                quantidade: pedidos[i].quantidade,
                preco: pedidos[i].preco,
            }

            temp.push(novoItem);
        }
    }
    return temp;
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
            <div class="conta-menu">
                <div class="conta-menu-botao">EMITIR CONTA</div>
                <div class="conta-menu-divisao">
                    <input type="number" min="1" v-model="divisao" class="numero-mesa">
                    <div class="dividir-conta" @click="handleDivisao">DIVIDIR CONTA</div>
                </div>
            </div>

            <div class="conta">
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
                    <h1 v-if="patio[mesa].conta === 0">MESA SEM PEDIDOS</h1>
                    <div v-for="item in patio[mesa].pedidos">
                        <div v-if="item.status !== 'cancelado'" class="item">
                            <p>{{ item.nome }}</p>
                            <p style="text-align: center">{{ item.quantidade }}</p>
                            <p>R$ {{ item.preco.toFixed(2) }}</p>
                            <p>{{ item.horario }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="conta-divisao">
                <Conta v-for="i in contas.length" :pedidos="contas[i - 1]" :numero="i"/>
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
    display: grid;
    grid-template-columns: 1fr 3fr 1.5fr;
    height: 90vh;
}

.conta-menu {
    background-color: #dadada;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3vh;
}

.conta-menu-botao {
    width: 15vw;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c1c1c1;
    border-radius: 0.5vw;
}

.conta-menu-botao:hover {
    cursor: pointer;
    background-color: #c8c8c8;
}

.conta-menu-divisao {
    display: flex;
    justify-content: center;
    height: 10vh;
}

.dividir-conta {
    width: 10vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c1c1c1;
    border-radius: 0 0.5vw 0.5vw 0;
}

.dividir-conta:hover {
    cursor: pointer;
    background-color: #adadad;
}

.numero-mesa {
    width: 5vw;
    height: 100%;
    border: none;
    outline: none;
    font-size: 2.5em;
    text-align: center;
    border-radius: 0.5vw 0 0 0.5vw;
}

.conta {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.conta-divisao {
    background-color: #dadada;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    overflow: auto;
    padding-top: 5vh;
    padding-bottom: 5vh;
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