const mongoose = require('../../database');
const bcrypt = require('bcryptjs'); // biblioteca para fazer a criptografia da senha

// criando abaixo o modelo de cadastro de rpojeto, colocando quais dados queremos, seus tipos etc.
const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Project = mongoose.model('Project', ProjectSchema); 
// atribuimos ao  "Project" nosso modelo de cadastro, passando como paramêtro o nome e schema

module.exports = Project; 
// exportando o Project para ser usado em outros arquivos