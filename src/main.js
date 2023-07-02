import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

let patio = ref([
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
    {
        conta: 0,
        pedidos: [],
    },
])

function adicionarItens(lista, mesa) {
    let conta = 0;
    let mesaSelecionada = patio.value[mesa - 1];

    for(let i = 0; i < lista.length; i++){
        conta += lista[i].preco
    }

    mesaSelecionada.pedidos = mesaSelecionada.pedidos.concat(lista)
    mesaSelecionada.conta += conta;
}

const app = createApp(App)

app.use(router)

app.provide('patio', {patio, adicionarItens})

app.mount('#app')
