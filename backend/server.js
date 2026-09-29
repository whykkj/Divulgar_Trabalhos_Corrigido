require('dotenv').config();

const sequelize = require('./database/database');
const Profissional = require('./models/Profissional');

const express = require('express');
const cors = require('cors');
const path = require('path');


const geocodificacaoRoutes =
    require('./routes/geocodificacaoRoutes');

const cepRoutes = require('./routes/cepRoutes');
const localizacaoRoutes = require('./routes/localizacaoRoutes');
const profissionaisRoutes = require('./routes/profissionaisRoutes');    
const enderecoRoutes =
    require('./routes/enderecoRoutes');
const agendamentoRoutes =
    require('./routes/agendamentoRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();

app.use(cors());
app.use(express.json());


// ROTAS DA API

app.use('/api/cep', cepRoutes);

app.use('/api/localizacao', localizacaoRoutes);

app.use('/api/profissionais', profissionaisRoutes);
app.use(
    '/api/geocodificacao',
    geocodificacaoRoutes
);
app.use(
    '/api/endereco',
    enderecoRoutes
);
app.use(
    '/api/agendamentos',
    agendamentoRoutes
);
app.use(
    '/api/usuarios',
    usuariosRoutes
);

// ROTA PRINCIPAL

app.get('/', (req, res) => {

    res.json({
        mensagem: 'API funcionando!'
    });

});


// PÁGINA PARA TESTAR GEOLOCALIZAÇÃO

app.get('/teste-localizacao', (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'teste-localizacao.html'
        )
    );

});


const PORT =
    process.env.PORT || 3000;

sequelize.sync()
    .then(() => {
        console.log('Banco MySQL conectado!');
    })
    .catch((erro) => {
        console.error('Erro ao conectar ao banco:', erro);
    });

app.listen(PORT, () => {

    console.log(
        `API rodando em http://localhost:${PORT}`
    );

});