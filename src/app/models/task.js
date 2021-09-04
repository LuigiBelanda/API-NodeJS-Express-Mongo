const mongoose = require('../../database');
const bcrypt = require('bcryptjs'); // biblioteca para fazer a criptografia da senha

// criando abaixo o modelo de cadastro de rpojeto, colocando quais dados queremos, seus tipos etc.
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        require: true,
    },
    completed: {
        type: Boolean,
        require: true,
        default: false,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Task = mongoose.model('Task', TaskSchema); 
// atribuimos ao  "Task" nosso modelo de cadastro, passando como paramêtro o nome e schema

module.exports = Task; 
// exportando o Task para ser usado em outros arquivos