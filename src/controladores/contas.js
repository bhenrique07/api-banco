let { contas, depositos, transferencias, saques } = require('../bancodedados');
let numeroId = 0;

const listarContas = (req, res) => {
    res.status(200).send(contas);
}

const criarConta = (req, res) => {
    const { nome, cpf, email } = req.body;
    if(!nome) {
        return res.status(400).json({ "mensagem": "Por favor, preencher o nome corretamente"})
    }
    if(!cpf || cpf.length !== 11) {
        return res.status(400).json({ "mensagem": "Por favor, preencher o cpf corretamente"})
    }
    if(!email) {
        return res.status(400).json({ "mensagem": "Por favor, preencher o email corretamente"})
    }
    const verificarEmail = contas.find((conta) => {
        return email === conta.usuario.email;
    });
    if(verificarEmail) {
        return res.status(400).json({ "mensagem": "Email já cadastrado."});
    }
    const verificarCpf = contas.find((conta) => {
        return cpf === conta.usuario.cpf;
    });
    if(verificarCpf) {
        return res.status(400).json({ "mensagem": "CPF já cadastrado."});
    }
    const dadosDaConta = {
        numero: ++numeroId,
        saldo: 0,
        usuario: req.body
    }
    contas.push(dadosDaConta);
    return res.status(201).send();
}


const excluirConta = (req, res) => {
    const { numeroConta } = req.params;
    const conta = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });

    if(!conta) {
        return res.status(400).json({ "mensagem": "A conta informada não existe!"});
    }
    if(conta.saldo !== 0) {
        return res.status(400).json({ "mensagem": "A conta só pode ser removida se o saldo for zero!"});
    }
    const deletarIndex = contas.findIndex((conta)=> {
        return conta.numero === Number(numeroConta);
    });
    contas.splice(deletarIndex, 1);
    return res.status(204).send();
}

const atualizarConta = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const contaInformada = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });

    const verificarDadosRepetidos = contas.filter((conta) => {
        return conta.numero !== Number(numeroConta);
    });

    const cpfInformado = verificarDadosRepetidos.find((conta) => {
        return cpf === conta.usuario.cpf;
    });
    const emailInformado = verificarDadosRepetidos.find((conta) => {
        return email === conta.usuario.email;
    })

    if(!contaInformada) {
        return res.status(400).json({ "mensagem": "Conta informada não existe!" });
    }
    if( !nome || !cpf || !email || !data_nascimento || !telefone || !senha){
        return res.status(400).json({ "mensagem": "É obrigatório preencher todos os campos." })
    }
    if(emailInformado) {
        return res.status(400).json({ "mensagem": "Já existe cadastro com este email!"});
    }
    if(cpfInformado) {
        return res.status(400).json({ "mensagem": "Já existe conta com o cpf informado!"});
    }

    contaInformada.usuario.nome = nome;
    contaInformada.usuario.cpf = cpf;
    contaInformada.usuario.data_nascimento = data_nascimento;
    contaInformada.usuario.telefone = telefone;
    contaInformada.usuario.email = email;
    contaInformada.usuario.senha = senha;
    
    return res.status(200).send();
}

const saldo = (req, res) => {
    const { numero_conta, senha } = req.query;
    const contaInformada = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });
    if(!contaInformada || !senha) {
        return res.status(400).json({ "mensagem": "É necessário informar sua conta e senha!" });
    };
    if(!contaInformada){
        return res.status(400).json({ "mensagem": "Conta bancária não encontada!" });
    };
    const senhaInformada = contas.find((conta) => {
        return senha === conta.usuario.senha;
    });
    if(!senhaInformada){
        return res.status(401).json({ "mensagem": "A senha informada é inválida."})
    };
    const saldo = {
        saldo: contaInformada.saldo
    };
    return res.status(200).json(saldo);

};

const extrato = (req, res) => {
    const { numero_conta, senha } = req.query;
    const contaInformada = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });
    if(!contaInformada || !senha) {
        return res.status(400).json({ "mensagem": "É necessário informar sua conta e senha!" });
    };
    if(!contaInformada){
        return res.status(400).json({ "mensagem": "Conta bancária não encontada!" });
    };
    const senhaInformada = contas.find((conta) => {
        return senha === conta.usuario.senha;
    });
    if(!senhaInformada){
        return res.status(401).json({ "mensagem": "A senha informada é inválida."})
    };

    const depositosRealizados = depositos.filter((conta) => {
        return conta.numero_conta === numero_conta;
    });
    const saquesRealizados = saques.filter((conta) => {
        return conta.numero_conta === numero_conta;
    });
    const transferenciasEnviadas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === numero_conta;
    });
    const transferenciasRecebidas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === numero_conta;
    });
    const extratoDetalhado = {
        depositos: depositosRealizados,
        saques: saquesRealizados,
        transferenciasEnviadas: transferenciasEnviadas,
        transferenciasRecebidas: transferenciasRecebidas
    }
    return res.status(200).json(extratoDetalhado);

}

module.exports = {
    listarContas,
    criarConta,
    excluirConta,
    atualizarConta,
    saldo,
    extrato
}