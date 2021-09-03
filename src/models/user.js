const mongoose = require('../database');
const bcrypt = require('bcryptjs'); // biblioteca para fazer a criptografia da senha

// criando abaixo o modelo de cadastro de usuário, colocando quais dados queremos, seus tipos etc.
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // com o select "false" quando fizermos uma busca no banco ele não trará o campo password
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// antes de salvar o user criptografamos a senha 
UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema); // atribuimos ao "User" nosso modelo de cadastro, passando como paramêtro o nome e schema

module.exports = User; // exportando o User para ser usado em outros arquivos