const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    // pegando o header com o token
    const authHeader = req.headers.authorization;

    // verificando se o header existe e tem o token
    if(!authHeader) {
        return res.status(401).send({ error: "No token provided" });
    } 

    // separando o header em duas partes Bearer e o hash
    const parts = authHeader.split(' ');

    // verificando se as duas partes citadas acimas existem
    if(!parts.length === 2) {
        return res.status(401).send({ error: "Token error" });
    } 
    
    // se elas existirem fazemos um destructuring
    const [ scheme, token ] = parts;
    

    // verificamos se aqui a nossa primeira parte tem a palavra "Bearer" escrita ou algo mais
    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: "Token malformated" });
    } 

    // verificamos se o token é o mesmo que foi passado para o user
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: "Token invalid" });

        req.userId = decoded.id; 
        return next(); 
        // se tudo der certo damos um next e seguimos em frente
    })
};