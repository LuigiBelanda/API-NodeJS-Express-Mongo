const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('OK');
});
// sempre que a requisião foi feita no http://localhost:3000/ ele irá retornan um "OK"

require('./app/controllers/index')(app);

app.listen(3000);
// colando o app para rodar na porta 3000