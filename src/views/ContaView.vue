<script setup>
import { ref, inject, watch } from 'vue';
import Conta from "../components/Conta.vue"
import SelecionarItem from "../components/SelecionarItem.vue"

let { patio } = inject('patio')

let modal = ref(false)

let listaDePedidos = ref([])
let listaTemporaria = ref([])
let listaPreTemporaria = ref([])

let mesas = ref(true)
let mesaSelecionada = ref(1)

let houveDivisao = ref(false)
let contasDivididas = ref(1)
let contas = ref([])
let contasStatus = ref([])
let contaSelecionada = ref()
 
function handleSelection(mesa) {
    mesaSelecionada.value = mesa - 1;
    if(!patio.value[mesaSelecionada.value].emitida) {
        contas.value = []
        contasStatus.value = []
        listaTemporaria.value = dataExtraction(patio.value[mesaSelecionada.value].pedidos)
    }
    listaDePedidos.value = dataExtraction(patio.value[mesaSelecionada.value].pedidos)
    mesas.value = false;
}

function handleEscape() {
    listaPreTemporaria.value = []
    modal.value = false
}

function handleDivisao() {

    if (contasDivididas.value === contas.value.length) {
        return;
    }

    contas.value = [];
    contasStatus.value = [];
    
    if (contasDivididas.value === 1) {
        houveDivisao.value = false;
        listaTemporaria.value = listaDePedidos.value;
        return;
    }

    for (let i = 0; i < contasDivididas.value; i++) {
        contas.value.push([]);
        contasStatus.value.push({status: ''});
    }

    listaTemporaria.value = listaDePedidos.value;
    houveDivisao.value = true;
}

function handleConta(conta) {
    contaSelecionada.value = conta;
    listaPreTemporaria.value = [];
    modal.value = true;
}

function dataExtraction(originalArray) {
    const resultado = [];
    const mapa = new Map();

    originalArray.forEach(obj => {
        if (obj.status !== 'cancelado') {
            if (mapa.has(obj.nome)) {
                const itemExistente = mapa.get(obj.nome);
                itemExistente.preco += obj.preco;
                itemExistente.quantidade += obj.quantidade;
            } else {
                mapa.set(obj.nome, {
                    nome: obj.nome,
                    preco: obj.preco,
                    quantidade: obj.quantidade
                });
            }
        }
    });

    mapa.forEach(value => resultado.push(value));

    return resultado;
}

function handleOperation(objeto) {
    const { op, nome, preco, quantidade } = objeto;

    if (op === "add") {
        const index = listaPreTemporaria.value.findIndex(item => item.nome === nome);

        if (index !== -1) {
            listaPreTemporaria.value[index].preco = preco;
            listaPreTemporaria.value[index].quantidade = quantidade;
        } else {
            listaPreTemporaria.value.push({ nome, preco, quantidade });
        }
    } else if (op === "remove") {
        const index = listaPreTemporaria.value.findIndex(item => item.nome === nome);

        if (index !== -1) {
            listaPreTemporaria.value.splice(index, 1);
        }
    }
}

function handleAdditions() {
    for(let i = 0; i < listaPreTemporaria.value.length; i++) {

        const preTemp = listaPreTemporaria.value[i];
        const index = listaTemporaria.value.findIndex(item => item.nome === preTemp.nome)

        if(index !== -1) {
            listaTemporaria.value[index].quantidade -= preTemp.quantidade;
            listaTemporaria.value[index].preco -=preTemp.preco;
    
            if(listaTemporaria.value[index].quantidade === 0) {
                listaTemporaria.value.splice(index, 1);
            }
        }
    }

    contas.value[contaSelecionada.value] = contas.value[contaSelecionada.value].concat(listaPreTemporaria.value);

    modal.value = false;
}

function handleReset() {
    contas.value = [];
    contasStatus.value = []

    for (let i = 0; i < contasDivididas.value; i++) {
        contas.value.push([]);
        contasStatus.value.push({status: ''});
    }

    listaTemporaria.value = dataExtraction(patio.value[mesaSelecionada.value].pedidos)
    listaDePedidos.value = dataExtraction(patio.value[mesaSelecionada.value].pedidos)
}

function handleRemocao(obj) {
    if(contasStatus.value[obj.numero].status !== '') {
        return;
    }

    const index = listaTemporaria.value.findIndex(item => item.nome === obj.pedido.nome)
    const rIndex = contas.value[obj.numero].findIndex(item => item.nome === obj.pedido.nome)

    if(index === -1) {
        listaTemporaria.value.push(obj.pedido)
        contas.value[obj.numero].splice(rIndex, 1)
    }
    else {
        listaTemporaria.value[index].quantidade += obj.pedido.quantidade;
        listaTemporaria.value[index].preco += obj.pedido.preco;
        contas.value[obj.numero].splice(rIndex, 1)
    }
}

function handleStatus(obj) {
    let status = obj.$event.target.value;
    let index = obj.numero;

    contasStatus.value[index].status = status;
    checarPagamentos();
}

function handleEmissao(i) {

    if(i === -1) {
        if(patio.value[mesaSelecionada.value].pedidos.length === 0) {
            alert("Insira algum item antes de emitir essa conta.");
            return
        }

        patio.value[mesaSelecionada.value].emitida = true;
        alert("Enviado para a impressora!")
        checarPagamentos();
        return;
    }

    if(contas.value[i].length === 0){
        alert("Insira algum item antes de emitir essa conta.")
        return;
    }

    if(listaTemporaria.value.length !== 0) {
        alert("Ainda existem itens não alocados em uma conta.");
        return;
    }

    patio.value[mesaSelecionada.value].emitida = true;
    contasStatus.value[i].status = 'pendente';
    checarPagamentos();
    alert("Enviado para a impressora!")
}

function cancelarEmissao() {
    contas.value = [];
    patio.value[mesaSelecionada.value].emitida = false; 
    patio.value[mesaSelecionada.value].paga = false
}

function checarPagamentos() {
    let todosPagos = true;

    for(let i = 0; i < contas.value.length; i++) {
        if(contasStatus.value[i].status !== 'pago' && contas.value[i].length > 0) {
            todosPagos = false;
            break;
        }    
    }

    if(contasDivididas.value == 1)
    {
        todosPagos = false;
    }

    patio.value[mesaSelecionada.value].paga = todosPagos;
}

</script>

<template>
    <Transition>
        <div v-if="modal" class="overlay">
            <div class="modal">
                <div class="modal-header">
                    <p>Conta {{ contaSelecionada + 1 }}</p>
                    <button @click="handleEscape">✕</button>
                </div>
                <div class="modal-conteudo">
                    <div class="modal-conteudo-header">
                        <p>NOME</p>
                        <p>PREÇO</p>
                        <p>QUANTIDADE</p>
                    </div>
                    <SelecionarItem v-for="item in listaTemporaria" :item="item" :numeroConta="contaSelecionada"
                        @itemSelecionado="handleOperation"/>
                </div>
                <div class="modal-acao">
                    <button @click="handleAdditions">ADICIONAR ITENS</button>
                </div>
            </div>
        </div>
    </Transition>

    <div v-if="mesas" class="container-mesas">
        <h1>ESCOLHA UMA MESA:</h1>
        <div class="lista-de-mesas">
            <div class="mesa" v-for="i in patio.length" @click="handleSelection(i)">
                Mesa {{ i }}
            </div>
        </div>
    </div>

    <div v-else class="container-pagina">
        <div class="conta-menu">
            <button v-if="!houveDivisao" class="conta-menu-botao" @click="handleEmissao(-1)" :disabled="patio[mesaSelecionada].emitida">EMITIR CONTA</button>
            <div v-if="!patio[mesaSelecionada].emitida" class="conta-menu-botao" @click="handleReset">RESETAR</div>
            <div class="container-divisao">
                <input type="number" min="1" v-model="contasDivididas" class="conta-menu-numero">
                <button class="conta-menu-dividir" @click="handleDivisao" :disabled="patio[mesaSelecionada].emitida">DIVIDIR CONTA</button>
            </div>
            <select v-if="patio[mesaSelecionada].emitida" :value="patio[mesaSelecionada].paga" @change="event => patio[mesaSelecionada].paga = event.target.value">
                <option value="true">PAGA</option>
                <option value="false">PENDENTE</option>
            </select>
            <button v-if="patio[mesaSelecionada].emitida" class="conta-menu-botao" @click="cancelarEmissao">CANCELAR EMISSÃO</button>
        </div>

        <div class="conta-itens">

            <div class="conta-titulo">
                <button @click="mesas = true; houveDivisao = false; contasDivididas = 1">VOLTAR</button>
                <h1>CONTA DA MESA {{ mesaSelecionada + 1 }}: R$ {{ patio[mesaSelecionada].conta.toFixed(2) }}</h1>
            </div>

            <div class="conta-pedidos">
                <div class="conta-header">
                    <p>ITEM</p>
                    <p style="text-align: center">QUANTIDADE</p>
                    <p>UNIDADE</p>
                    <p>VALOR</p>
                </div>

                <h1 v-if="patio[mesaSelecionada].conta === 0">MESA SEM PEDIDOS</h1>
                <div v-for="item in listaDePedidos" class="conta-pedido">
                    <p>{{ item.nome }}</p>
                    <p style="text-align: center">{{ item.quantidade }}</p>
                    <p>R$ {{ (item.preco / item.quantidade).toFixed(2) }}</p>
                    <p>R$ {{ item.preco.toFixed(2) }}</p>
                </div>
            </div>
        </div>
        <div class="conta-lista">
            <Conta v-for="(conta, i) in contas" :pedidos="conta" :numero="i" :status="contasStatus[i].status" @adicionarPedidos="handleConta(i)"
                @emitirConta="handleEmissao(i)" @removerItem="handleRemocao" @mudarStatus="handleStatus"/>
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
    width: 30vw;
    height: 50vh;
    border-radius: 0.5vw;
    display: grid;
    grid-template-rows: 10% 80% 10%;

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
    flex-direction: column;
    padding: 0.2vw;
    overflow: auto;
}

.modal-conteudo-header {
    display: grid;
    grid-template-columns: 1fr 0.5fr 0.5fr;
    font-weight: 700;
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

.container-pagina {
    width: 100vw;
    height: 90vh;
    display: grid;
    grid-template-columns: 1fr 3fr 1.5fr;
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
    border: none;
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

.container-divisao {
    display: flex;
    justify-content: center;
    height: 10vh;
}

.conta-menu-dividir {
    border: none;
    width: 10vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c1c1c1;
    border-radius: 0 0.5vw 0.5vw 0;
}

.conta-menu-dividir:hover {
    cursor: pointer;
    background-color: #adadad;
}

.conta-menu-numero {
    width: 5vw;
    height: 100%;
    border: none;
    outline: none;
    font-size: 2.5em;
    text-align: center;
    border-radius: 0.5vw 0 0 0.5vw;
}

.conta-titulo {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2vw;
}

.conta-pedidos {
    display: flex;
    flex-direction: column;
    width: 40vw;
    height: 75vh;
    overflow: auto;
}

.conta-header {
    display: grid;
    grid-template-columns: 2fr 1fr 0.5fr 0.5fr;
}

.conta-header p {
    font-weight: 700;
}

.conta-pedido {
    display: grid;
    grid-template-columns: 2fr 1fr 0.5fr 0.5fr;
}

.conta-itens {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.conta-lista {
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #dadada;
    overflow: auto;
}
</style>