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
    {
        conta: 0,
        pedidos: [],
    },
])

function adicionarItens(lista, mesa) {
    let conta = 0;

    for(let i = 0; i < lista.length; i++){
        conta += lista[i].preco
    }

    patio.value[mesa - 1].pedidos = patio.value[mesa - 1].pedidos.concat(lista)
    patio.value[mesa - 1].conta += conta;
}

const app = createApp(App)

app.use(router)

app.provide('patio', {patio, adicionarItens})

app.mount('#app')
