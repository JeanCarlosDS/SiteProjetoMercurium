
const express = require('express');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const url = require('url');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const app = express();
const router = express.Router();

app.use(express.static(path.join(__dirname, '/css')));
app.use(express.static(path.join(__dirname, '/img')));
app.use(express.static(path.join(__dirname, '/js')));

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/sendmsg', (req, res, next) => {
    let a = req.protocol + '://' + req.get('host') + req.originalUrl; // pega a url completa
    let q = url.parse(a, true);
    let qdata = q.query;

    let nome = qdata.nome_usuario;
    let email = qdata.email_usuario;
    let texto = qdata.texto_usuario;

    const msg = {
        /* to: 'projetomercurium@gmail.com',
        from: 'projetomercurium@gmail.com',
        subject: 'Contato através do site - ' + nome,
        text: 'Nome do remetente: ' + nome + '\n \nE-mail do remetente: ' + email + '\n \nTexto: ' + texto,
        html: '<b> Nome do remetente: </b> ' + nome + '<br> <br> <b> E-mail do remetente: </b>' + email + '<br> <br> <b> Texto: </b>' + texto, */
        to: 'projetomercurium@gmail.com',
        from: 'projetomercurium@gmail.com',
        subject: 'Contato através do site - ' + nome,
        text: 'E-mail do remetente: ' + email + '\n \nTexto: ' + texto,
        html: 'Nome do remetente: ' + nome + '<br> <br> E-mail do remetente: ' + email + '<br> <br> Texto: ' + texto,
    }

    sgMail
    .send(msg)
    .then(() => {
        console.log('deu certo patraum')
    })
    .catch((error) => {
        console.error(error)
    });

    res.redirect('/');
});



app.use('/', router);

app.listen(8080, () => {
    console.log('servidor rodando');
});