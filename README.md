
# Projeto de um Sistema Bancário

  API Restful de um sistema bancário, com operações CRUD, que foi desenvolvida com as seguintes tecnologias: JavaScript, Node.js e Express.


## Funcionalidades:

Um sistema que realiza operações bancárias do tipo:

- Criar conta bancaria
- Listar contas bancarias
- Atualizar os dados do usuário da conta bancária
- Excluir uma conta bancária
- Depositar em uma conta bancária
- Sacar de uma conta bancária
- Transferir valores entre contas bancárias
- Consultar saldo da conta bancária
- Emitir extrato bancario

## Endpoints:

- GET /contas?senha_banco=Cubos123Bank - Para listar todas as contas existentes no banco
- POST /contas - Para criar uma nova contas
- PUT /contas/:numeroConta/usuario - Atualiza os dados do usuário
- DELETE /contas/:numeroConta - Vai deletar a conta bancária do usuario selecionado.
- POST /transacoes/depositar - Realiza um depósito na conta que foi informada.
- POST /transacoes/sacar - Realiza um saque se houver saldo.
- POST /transacoes/transferir - Realiza transferencias entre contas do próprio banco.
- GET /contas/saldo?numero_conta=123&senha=123 - Mostra ao usuário o valor do saldo de sua conta.
- GET /contas/extrato?numero_conta=123&senha=123 - Mostra toda a movimentação de sua conta.
## Como utilizar:

- Copie o ssh do repositório para realizar o clone
- Utilize o um editor de código de sua preferência ou o terminal de sua máquina e faça um gitclone.
- Após realizar os passos anteriores, instale o npm em seu projeto e execute-o.
## Tecnologias utilizadas:


![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)![Node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white) 