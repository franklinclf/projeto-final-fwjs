<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <RouterView />
<div>
    <nav class="nav-bar">
        <RouterLink to="/" class="nav-link" active-class="nav-link-active">CARDÁPIO</RouterLink>
        <RouterLink to="/pedido" class="nav-link" active-class="nav-link-active">PEDIDO</RouterLink>
        <RouterLink to="/conta" class="nav-link" active-class="nav-link-active">CONTA</RouterLink>
    </nav>
</div>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700;900&display=swap');
  .nav-bar {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: stretch;
    position: fixed;
    bottom: 0;
  }

  .nav-link {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fafafa;
    height: 10vh;
  }

  .nav-link:hover, .nav-link-active{
    background-color: #dadada;
  }

  RouterLink {
    text-decoration: none;
  }

</style>
