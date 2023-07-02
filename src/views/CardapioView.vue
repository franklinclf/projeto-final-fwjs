<script setup>
import { ref, watch, inject } from 'vue';
import { cardapio } from '../assets/cardapio';

let { patio, adicionarItens } = inject('patio')
let listaDeItems = ref(cardapio);

let pesquisa = ref('');
let modal = ref(false);
let modalQuantidade = ref(1)
let mesaSelecionada = ref(1);
let itemSelecionado = ref();
let pedidosAnotados = ref([]);

watch(pesquisa, () => {
    listaDeItems = cardapio.filter(item => item.nome.toLowerCase().includes(pesquisa.value.toLowerCase()))
})

function filtrar(tipo) {
    switch (tipo) {
        case "tudo": listaDeItems.value = cardapio;
            break;
        case "bebidas": listaDeItems.value = cardapio.filter(item => item.tipo === 'bebida');
            break;
        case "petiscos": listaDeItems.value = cardapio.filter(item => item.tipo === 'petisco');
            break;
        case "outros": listaDeItems.value = cardapio.filter(item => item.tipo === 'outros');
            break;
        default: listaDeItems.value = cardapio;
            break;
    }
}

function handleSelection(item) {
    itemSelecionado.value = item;
    modalQuantidade.value = 1;
    modal.value = true;
}

function handleQuantity(op) {
    switch (op) {
        case 'minus': modalQuantidade.value === 1 ? modalQuantidade.value = 1 : --modalQuantidade.value;
            break;
        case 'plus': ++modalQuantidade.value;
            break;
        default:
            break;
    }
}

function anotarPedido(item, q) {
    let currentTime = new Date();
    let valor = item.preco * q;
    let temp = {
        id: Math.floor(Math.random() * 9000) + 1000,
        nome: item.nome,
        preco: valor,
        quantidade: q,
        horario: currentTime.getMinutes() < 10 ? `${currentTime.getHours()}:0${currentTime.getMinutes()}` : `${currentTime.getHours()}:${currentTime.getMinutes()}`,
        status: "preparo"
    }

    pedidosAnotados.value.push(temp)
    modal.value = false;
}

function excluirPedido(id) {
    pedidosAnotados.value = pedidosAnotados.value.filter(pedido => pedido.id !== id);
}

</script>

<template>

    <!-- ///////////////////// OVERLAY E MODAL ////////////////////////////////////////////////////////////////////////////// -->
   
    <Transition>
        <div v-if="modal" class="overlay">
            <div class="modal">
                <div class="modal-header">
                    <p>{{ itemSelecionado.nome }}</p>
                    <button @click="modal = false">✕</button>
                </div>
                <div class="modal-conteudo">
                    <p>R$ {{ (itemSelecionado.preco * modalQuantidade).toFixed(2) }}</p>
                    <div class="modal-quantidade">
                        <div class="minus" @click="handleQuantity('minus')">−</div>
                        <div class="modal-quantidade-numero">{{ modalQuantidade }}</div>
                        <div class="plus" @click="handleQuantity('plus')">+</div>
                    </div>
                </div>
                <div class="modal-acao">
                    <button @click="anotarPedido(itemSelecionado, modalQuantidade)">ANOTAR PEDIDO</button>
                </div>
            </div>
        </div>
    </Transition>

    <div class="container-pagina">

        <!-- ///////////////////// SEÇÃO DE MENU - FILTRO E PESQUISA DO CARDÁPIO ///////////////////////////////////////////// -->

        <div class="cardapio-menu">
            <div class="cardapio-pesquisa">
                <h1>PESQUISA:</h1>
                <input type="text" v-model="pesquisa" placeholder="Digite aqui...">
            </div>
            <div class="cardapio-filtro" @click="filtrar('tudo')">
                TUDO
            </div>
            <div class="cardapio-filtro" @click="filtrar('bebidas')">
                BEBIDAS
            </div>
            <div class="cardapio-filtro" @click="filtrar('petiscos')">
                PETISCOS
            </div>
            <div class="cardapio-filtro" @click="filtrar('outros')">
                OUTROS
            </div>
        </div>

        <!-- ///////////////////// SEÇÃO DE ITENS DO CARDÁPIO //////////////////////////////////////////////////////////////// -->

        <div class="cardapio-itens">
            <div class="cardapio-item" v-for="item in listaDeItems" @click="handleSelection(item)">{{ item.nome }}</div>
        </div>

        <!-- ///////////////////// SEÇÃO DE ITENS ANOTADOS /////////////////////////////////////////////////////////////////// -->

        <div class="cardapio-pedidos">
            <div class="cardapio-lista-pedidos">
                <div class="cardapio-pedido" v-for="pedido in pedidosAnotados" @click="excluirPedido(pedido.id)">
                    <div>{{ pedido.nome }} ({{ pedido.quantidade }})</div>
                    <div>R$ {{ pedido.preco.toFixed(2) }}</div>
                </div>
            </div>
            <div class="cardapio-fazer-pedido">
                <select class="numero-mesa" v-model="mesaSelecionada">
                    <option v-for="i in patio.length" :value="i">{{ i }}</option>
                </select>
                <div class="confirmar-pedido"
                    @click="adicionarItens(pedidosAnotados, mesaSelecionada); pedidosAnotados = [];">FAZER PEDIDO</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 99;
}

.modal {
    background-color: white;
    width: 25vw;
    height: 25vh;
    border-radius: 0.5vw;
    display: grid;
    grid-template-rows: 20% 60% 20%;

}

.modal-header {
    background-color: #bdbdbd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.2vw 0.2vw 0 0;
    padding: 0.2vw;
}

.modal-header button {
    border: none;
    background-color: #dadada;
    border-radius: 0.2vw;
}

.modal-header button:hover {
    cursor: pointer;
    background-color: #b0b0b0;
}

.modal-conteudo {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.2vw;
}

.modal-quantidade {
    display: flex;
    height: 3.5vh;
}

.modal-quantidade-numero {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.5vh;
}

.minus,
.plus {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.5vh;
    background-color: #dadada;
    border-radius: 0.2vw;
}

.minus:hover,
.plus:hover {
    cursor: pointer;
    background-color: #b0b0b0;
}

.modal-acao {
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 0.2vw;
}

.modal-acao button {
    border: none;
    background-color: #dadada;
    width: 50%;
    height: 100%;
    border-radius: 0.2vw;
}

.modal-acao button:hover {
    cursor: pointer;
    background-color: #b0b0b0;
}

.container-pagina {
    width: 100vw;
    height: 90vh;
    display: grid;
    grid-template-columns: 1fr 3fr 1.5fr;
}

.cardapio-menu {
    height: 90vh;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    background-color: #dadada;
    justify-items: stretch;
    align-items: center;
}

.cardapio-pesquisa {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

input[type=text] {
    width: 75%;
    height: 4vh;
    font-size: 1rem;
    border-radius: 0.2vw;
    border: none;
}

.cardapio-filtro {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cardapio-filtro:hover {
    cursor: pointer;
    background-color: #bdbdbd;
}

.cardapio-itens {
    margin: 2vw;
    display: flex;
    height: 85vh;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 1vw;
    overflow: auto;
}

.cardapio-item {
    width: 10vw;
    height: 10vh;
    padding: 1%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-wrap: break-word;
    box-shadow: 0px 0px 1px 1px #c8c8c8;
}

.cardapio-item:hover {
    cursor: pointer;
    background-color: #c8c8c8;
}

.cardapio-pedidos {
    display: grid;
    grid-template-rows: 70% 30%;
    height: 90vh;
    background-color: #dadada;
}

.cardapio-lista-pedidos {
    overflow: auto;
}

.cardapio-pedido {
    height: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
}

.cardapio-pedido:hover {
    cursor: pointer;
    background-color: #c1c1c1;
}

.cardapio-fazer-pedido {
    display: flex;
    justify-content: center;
    align-items: center;
}

.confirmar-pedido {
    width: 15vw;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c1c1c1;
    border-radius: 0 0.5vw 0.5vw 0;
}

.confirmar-pedido:hover {
    cursor: pointer;
    background-color: #adadad;
}

.numero-mesa {
    width: 5vw;
    height: 10vh;
    border: none;
    outline: none;
    font-size: 2.5em;
    text-align: center;
    border-radius: 0.5vw 0 0 0.5vw;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}</style>