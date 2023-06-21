<script setup>
import { ref, watch, inject } from "vue";
import { cardapio } from "../assets/cardapio.js";
import ItemCardapio from "../components/ItemCardapio.vue";
import Pedido from "../components/Pedido.vue";

let modalOn = ref(false);
let modalQuantity = ref(1)

let pedidoSelecionado = ref({})
let pedidosAnotados = ref([])
let mesa = ref(1)

let items = ref(cardapio);
let pesquisa = ref('');
ordenar(items.value)

let { patio, adicionarItens } = inject('patio')


function ordenar(array) {
  array.sort((objetoA, objetoB) => {
    const nomeA = objetoA.nome.toLowerCase();
    const nomeB = objetoB.nome.toLowerCase();

    if (nomeA < nomeB) {
      return -1;
    }
    if (nomeA > nomeB) {
      return 1;
    }
    return 0;
  });
}

function filtrar(type) {

  if (type === 'tudo') {
    items.value = cardapio;
    ordenar(items.value);
  }
  else if (type === 'bebida') {
    items.value = cardapio.filter(item => item.tipo === 'bebida');
    ordenar(items.value);
  }
  else if (type === 'petisco') {
    items.value = cardapio.filter(item => item.tipo === 'petisco');
    ordenar(items.value);
  }
  else if (type === 'outros') {
    items.value = cardapio.filter(item => item.tipo === 'outros');
    ordenar(items.value);
  }
  else {
    items.value = cardapio;
    ordenar(items.value);
  }
}

function selecionarPedido(item) {
  pedidoSelecionado.value = item;
  modalQuantity.value = 1;
  modalOn.value = true;
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
  modalOn.value = false;
}

function excluirPedido(id) {
  pedidosAnotados.value = pedidosAnotados.value.filter(pedido => pedido.id !== id);
}

watch(pesquisa, () => {
  items.value = cardapio.filter(item => item.nome.toLowerCase().includes(pesquisa.value.toLowerCase()))
})

</script>

<template>
  <Transition>
    <div v-if="modalOn" class="overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ pedidoSelecionado.nome }}</h3>
          <div @click="modalOn = false" class="modal-escape">✕</div>
        </div>
        <div class="modal-mid">
          <h4>R$ {{ pedidoSelecionado.preco.toFixed(2) }}</h4>
          <div class="modal-quantity">
            <div class="minus" @click="modalQuantity <= 1 ? modalQuantity = 1 : modalQuantity--">-</div>
            <div class="quantity">{{ modalQuantity }}</div>
            <div class="plus" @click="modalQuantity++">+</div>
          </div>
        </div>
        <div class="modal-footer">
          <div @click="anotarPedido(pedidoSelecionado, modalQuantity)" class="modal-pedido">Anotar Pedido</div>
        </div>
      </div>
    </div>
  </Transition>

  <div class="cardapio-container">
    <div class="cardapio-menu">

      <h1>CARDÁPIO</h1>
      <input type="text" v-model="pesquisa" placeholder="Pesquise por nome..." class="pesquisa" />

      <div class="filtros">
        <div class="cardapio-filtro" @click="filtrar('tudo')">TUDO</div>
        <div class="cardapio-filtro" @click="filtrar('bebida')">BEBIDAS</div>
        <div class="cardapio-filtro" @click="filtrar('petisco')">PETISCOS</div>
        <div class="cardapio-filtro" @click="filtrar('outros')">OUTROS</div>
      </div>
    </div>

    <div class="cardapio-items">
      <ItemCardapio v-for="item in items" :info="item" :key="item.nome" @click="selecionarPedido(item)"
        class="cardapio-item" />
    </div>

    <div class="pedidos-anotados">
      <div class="cardapio-pedido">
        <Pedido v-for="pedido in pedidosAnotados" :anotado="pedido" :key="pedido.nome"
          @click="excluirPedido(pedido.id)" />
      </div>
      <div class="fazer-pedido">
        <select name="numero-mesa" class="numero-mesa" v-model="mesa">
          <option v-for="i in patio.length" :value="i">{{ i }}</option>
        </select>
        <div class="confirmar-pedido" @click="adicionarItens(pedidosAnotados, mesa); pedidosAnotados = [];">FAZER PEDIDO</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.modal {
  position: absolute;
  background-color: white;
  width: 20vw;
  height: 11vw;
  padding: 10px;
  border-radius: 0.5vw;
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.modal-escape {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5vh;
  width: 1.5vw;
  height: 1.5vw;
  background-color: #dadada;
}

.modal-escape:hover {
  cursor: pointer;
  background-color: #c1c1c1;
}

.modal-mid {
  display: flex;
  justify-content: space-between;
}

.modal-quantity {
  display: flex;
  justify-content: center;
  align-items: center;
}

.minus {
  text-align: center;
  width: 1.5vw;
  height: 1.5vw;
  background-color: #dadada;
  border-radius: 0.5vh 0 0 0.5vh;
}

.minus:hover {
  cursor: pointer;
  background-color: #c1c1c1;
}

.quantity {
  text-align: center;
  width: 1.5vw;
  height: 1.5vw;
  box-shadow: inset 0 0 0px 2px #dadada;
}

.plus {
  text-align: center;
  width: 1.5vw;
  height: 1.5vw;
  background-color: #dadada;
  border-radius: 0 0.5vh 0.5vh 0;
}

.plus:hover {
  cursor: pointer;
  background-color: #c1c1c1;
}

.modal-footer {
  display: flex;
  justify-content: end;
}

.modal-pedido {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 5vh;
  background-color: #dadada;
  border-radius: 0.5vh;
}

.modal-pedido:hover {
  cursor: pointer;
  background-color: #c1c1c1;
}

.cardapio-container {
  display: grid;
  grid-template-columns: 1fr 3fr 1.5fr;
  height: 90vh;
}

.cardapio-menu {
  text-align: center;
  background-color: #dadada;
}

.cardapio-items {
  margin: 2vw;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  align-content: center;
  gap: 1vw;
}

.cardapio-item {
  width: 10vw;
  height: 10vh;

}

.pesquisa {
  width: 70%;
  height: 5vh;
  border-radius: 0.7vh;
  padding: 0.5rem;
  border: none;
}

.filtros {
  display: grid;
  height: 75vh;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  justify-items: stretch;
}

.cardapio-filtro {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cardapio-filtro:hover {
  cursor: pointer;
  background-color: #c1c1c1;
}

.cardapio-pedido {
  overflow: auto;
}

.pedidos-anotados {
  display: grid;
  grid-template-rows: 5fr 1fr;
  height: 90vh;
  background-color: #dadada;
}


.fazer-pedido {
  display: flex;
  justify-content: center;
  height: 10vh;

}

.confirmar-pedido {
  width: 15vw;
  height: 100%;
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
  height: 100%;
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
