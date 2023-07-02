<script setup>
import { reactive, ref } from 'vue';


let { item, numeroConta } = defineProps(['item', 'numeroConta'])
let quantidade = ref(1)
let check = ref(false)
let objetoItem = reactive({
    op: '',
    nome: item.nome,
    preco: item.preco / item.quantidade,
    quantidade: 1
})

const emit = defineEmits(['itemSelecionado'])

function handleQuantity(op) {
    if(op === 'minus') {
        if(quantidade.value === 1) {
            return
        }
        else {
            --quantidade.value;
            objetoItem.quantidade = quantidade.value;
            objetoItem.preco = item.preco / item.quantidade * objetoItem.quantidade;
            emit('itemSelecionado', objetoItem)
        }
    }

    else {
        if (quantidade.value === item.quantidade) {
            return
        }
        else {
            ++quantidade.value;
            objetoItem.quantidade = quantidade.value;
            objetoItem.preco = item.preco / item.quantidade * objetoItem.quantidade;
            emit('itemSelecionado', objetoItem)
        }
    }
}

function handleSelection() {
    if(!check.value) {
        objetoItem.op = 'add'
    }
    else {
        objetoItem.op = 'remove'
    }

    emit('itemSelecionado', objetoItem)
}


</script>

<template>
    <div class="container-item">
        <div class="container-nome">
            <input type="checkbox" :id="item.nome" v-model="check" @input="handleSelection">
            <label :for="item.nome">{{ item.nome }}</label>
        </div>

        <p>R$ {{ (item.preco / item.quantidade * quantidade).toFixed(2) }}</p>

        <div class="container-quantidade">
            <div class="minus" @click="handleQuantity('minus')">−</div>
            <div class="quantidade-numero">{{ quantidade }}</div>
            <div class="plus" @click="handleQuantity('plus')">+</div>
        </div>
    </div>
</template>

<style scoped>
.container-item {
    display: grid;
    grid-template-columns: 1fr 0.5fr 0.5fr;
    align-items: center;
}

.item-info {
    display: grid;
    grid-template-columns: 1fr 0.5fr 0.5fr;
}

.container-quantidade {
    display: flex;
    height: 3.5vh;
}

.quantidade-numero {
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

</style>