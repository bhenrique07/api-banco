const express = require('express');
const rotas = express();
const { listarContas, criarConta, excluirConta, atualizarConta, saldo, extrato } = require('./controladores/contas');
const { depositar, sacar, transferir } = require('./controladores/transacoes');
const { verificarSenha } = require('./intermediarios');

rotas.get('/contas', verificarSenha,listarContas);
rotas.post('/contas', criarConta);
rotas.delete('/contas/:numeroConta', excluirConta);
rotas.put('/contas/:numeroConta/usuario', atualizarConta);
rotas.get('/contas/saldo', saldo);
rotas.get('/contas/extrato', extrato);

rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/tranferir', transferir);

module.exports = rotas;