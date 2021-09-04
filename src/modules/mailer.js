const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const { host, port, user, pass} = require('../config/mail.json');
// const mailConfig = require('../config/mail.json');
// a linha acima funcionaria normalmente, mas na parte de baixo teriamos que por
// da seguinte forma: mailConfig.host
// colocando repetidas vezes o nome da var, algo que não é tão legal

// aqui passamos as infos necessárias para usar o MailTrap
const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
});

transport.use('compile', hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./src/resources/mail/')
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
}));

module.exports = transport;