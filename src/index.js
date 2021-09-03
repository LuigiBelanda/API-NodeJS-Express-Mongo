const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('OK');
});
// sempre que a requisião foi feita no http://localhost:3000/ ele irá retornan um "OK"

require('./controllers/authController')(app);
// carregando o aquivo acima "authController" e passando "app" como paramêtro
require('./controllers/projectController')(app);
// carregando o aquivo acima "projectController" e passando "app" como paramêtro

app.listen(3000);
// colando o app para rodar na porta 3000