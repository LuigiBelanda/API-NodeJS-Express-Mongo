const express = require('express'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const User = require('../models/user'); 
// pegando o "User" que criamos na pasta models

const router = express.Router(); 
// pegando a função router do express e colocando na consta router


// Função para gerar o token
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, // expira o token em 1 dia
    });

}


// criando usuários quando recebermos a requisição com "/register"
router.post('/register', async (req, res) => {
    const { email } = req.body; 
    // pegando o email que veio no corpo da requisição

    try {
        // se achar algum usuário com o memso email ele mostra a mensagem que o usuário ja existe
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'User already exists' });
        }
        
        // criando o usuário, aqui pegamos e damos um create no model User que criamos, pegando o corpo da requisição que recebemos
        const user = await User.create(req.body);
    
        // retiramos a senha do res
        user.password = undefined;

        // resposta se o usuário conseguir logar
        return res.send({ 
            user,
            token: generateToken({ id:user.id }), 
            // chamando a função para gerar o token passando como paramêtro o id do usuário
        });
    } catch (err) {
        // caso de algum erro, disparamos esse erro
        return res.status(400).send({ error: 'Resgistration failed' });
    }
});

// autenticação
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body; 
    // pegando o email e senha que veio no corpo da requisição

    const user = await User.findOne({ email }).select('+password'); 
    // verificamos se o email existe e pegamos a senha registrada com ele

    // se o user/email não existir, enviamos a mensagem abaixo
    if(!user) {
        return res.status(400).send({ error: 'user not found' });
    }

    // abaixo comparamos se a senha passada é a mesma que está cadastrada
    if(!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' });
    } else {
         // retiramos a senha do res
        user.password = undefined;

        res.send({ 
            user, 
            token: generateToken({ id:user.id }),
            // chamando a função para gerar o token passando como paramêtro o id do usuário
        });  
    }
});

module.exports = app => app.use('/auth', router); 
// sempre que a requisição vier com a "/auth" ele irá ir para o "/register" também