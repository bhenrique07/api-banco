const { contas, depositos, saques, transferencias } = require('../bancodedados');

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;
    if(!numero_conta || !valor) { //verificando se os dados foram informados no body
        return res.status(400).json({ "mensagem": "O número da conta e o valor são obrigatórios!"});
    }
    if(valor <= 0 ) {
        return res.status(400).json({ "mensagem": "Escolha um valor de depósito acima de 0."});
    }
    const contaInformada = contas.find((conta) => { // verificando se a conta informada existe
        return conta.numero === Number(numero_conta);
    });
    if(!contaInformada) {
        return res.status(400).json({ "mensagem": "A conta informada não existe!"});
    }

    contaInformada.saldo += Number(valor);
    const data = new Date();

    const depositoRealizado = {
        data,
        numero_conta,
        valor
    }
    depositos.push(depositoRealizado);

    return res.status(204).send();

}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if(!numero_conta || !valor || !senha){
        return res.status(400).json({ "mensagem" : "O número da conta, a senha e o valor a ser sacado, são obrigatórios!"});
    }
    const contaInformada = contas.find((conta) => { // verificando se a conta informada existe
        return conta.numero === Number(numero_conta);
    });
    if(!contaInformada) {
        return res.status(400).json({ "mensagem": "A conta informada não existe!"});
    }
    const senhaInformada = contas.find((conta) => {
        return senha === conta.usuario.senha && Number(numero_conta) === conta.numero;
    });
    if(!senhaInformada){
        return res.status(401).json({ "mensagem": "A senha informada é inválida."})
    }
    if(Number(valor) > contaInformada.saldo){
        return res.status(400).json({ "mensagem": "Não há saldo suficiente para saque!"});
    }
    if(Number(valor) <= 0) {
        return res.status(400).json({ "mensagem": "O valor não pode ser menor que zero!"});
    }
    contaInformada.saldo -= Number(valor);
    const data = new Date();

    const saqueRealizado = {
        data,
        numero_conta,
        valor
    }
    saques.push(saqueRealizado);
    return res.status(204).send();

}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    if(!numero_conta_destino || !numero_conta_origem || !valor || !senha) {
        return res.status(400).json({ "mensagem" : "É obrigatório preencher todos os campos."});
    }
    const contaOrigem = contas.find((conta) => { // verificando se a conta informada existe
        return conta.numero === Number(numero_conta_origem);
    });
    if(!contaOrigem) {
        return res.status(400).json({ "mensagem": "A conta informada não existe!"});
    }    
    const contaDestino = contas.find((conta) => { // verificando se a conta informada existe
        return conta.numero === Number(numero_conta_destino);
    });
    if(!contaDestino) {
        return res.status(400).json({ "mensagem": "A conta do destinatario não existe!"});
    }
    const senhaInformada = contas.find((conta) => {
        return senha === conta.usuario.senha && Number(numero_conta_origem) === conta.numero;
    });
    if(!senhaInformada){
        return res.status(401).json({ "mensagem": "A senha informada é inválida."})
    }
    if(Number(valor) > contaOrigem.saldo){
        return res.status(400).json({ "mensagem": "Saldo Insuficiente!"});
    }
    if(Number(valor) <= 0) {
        return res.status(400).json({ "mensagem": "O valor não pode ser menor que zero!"});
    }
    contaOrigem.saldo -= Number(valor);
    contaDestino.saldo += Number(valor);
    const data = new Date();

    const transferenciaRealizada = {
        data,
        numero_conta_origem,
        numero_conta_destino,
        valor
    }
    transferencias.push(transferenciaRealizada);
    return res.status(204).send();

}

module.exports = {
    depositar,
    sacar,
    transferir
}