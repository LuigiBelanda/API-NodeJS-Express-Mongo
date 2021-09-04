const fs = require('fs');
const path = require('path')

// abaixo pegamso todos os arquivos do diretoria, menos arquivos que começam com '.' e que não é o index
// depois fazemos um forEach pegando o arquivo e passando app para ele, assim importamos apenas no nosso index.js principal
// este arquivo index na pasta controllers
module.exports = app => {
    fs
        .readdirSync(__dirname)
        .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js")))
        .forEach(file => require(path.resolve(__dirname, file))(app));
}