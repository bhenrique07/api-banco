const { banco, contas } = require('./bancodedados');

const verificarSenha = ((req, res, next) => {
    const { senha_banco } = req.query;
        if(banco.senha !== senha_banco) {
            return res.status(401).json({mensagem: 'A senha do banco informada é inválida.'});
        }
        next();
});

module.exports = {
    verificarSenha
}