<script setup>
  import { ref } from "vue";
  import {cardapio} from "../assets/cardapio.js";
  import ItemCardapio from "../components/ItemCardapio.vue";
  let items = ref(cardapio);
</script>

<template>
  <div class="cardapio-container">
    <div class="cardapio-menu">
      <h1>CARDÁPIO</h1>
      <input type="text"/>
      <div class="filtros">
        <div class="cardapio-filtro">TUDO</div>
        <div class="cardapio-filtro">BEBIDAS</div>
        <div class="cardapio-filtro">PETISCOS</div>
        <div class="cardapio-filtro">OUTROS</div>
      </div>
    </div>
    <div class="cardapio-items">
      <ItemCardapio v-for="item in items" :info="item"/>
    </div>
    <div class="cardapio-pedido">
      c
    </div>
  </div>
</template>

<style scoped>
.cardapio-container {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  height: 90vh;
}

.cardapio-menu {
  background-color: #dadada;
}
.cardapio-items {
  background-color: #fafafa;
}

.filtros {
  display: grid;
  height: 80vh;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  justify-items: stretch;
}

.cardapio-filtro {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cardapio-filtro:hover {
  background-color: #c1c1c1;
}

</style>
