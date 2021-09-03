const express = require('express'); 

const User = require('../models/user'); // pegando o "User" que criamos na pasta models

const router = express.Router(); // pegando a função router do express e colocando na consta router

// criando usuários quando recebermos a requisição com "/register"
router.post('/register', async (req, res) => {
    const { email } = req.body; // pegando o email que veio no corpo da requisição

    try {
        // se achar algum usuário com o memso email ele mostra a mensagem que o usuário ja existe
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'User already exists' });
        }
        
        // criando o usuário, aqui pegamos e damos um create no model User que criamos, pegando o corpo da requisição que recebemos
        const user = await User.create(req.body);
    
        // retiramos a senha do res
        user.password = undefined;

        return res.send({ user });
    } catch (err) {
        // caso de algum erro, disparamos esse erro
        return res.status(400).send({ error: 'Resgistration failed' });
    }
});

module.exports = app => app.use('/auth', router); // sempre que a requisição vier com a "/auth" ele irá ir para o "/register" também