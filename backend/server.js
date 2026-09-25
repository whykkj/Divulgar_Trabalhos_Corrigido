const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();
const geocodificacaoRoutes =
    require('./routes/geocodificacaoRoutes');

const cepRoutes = require('./routes/cepRoutes');
const localizacaoRoutes = require('./routes/localizacaoRoutes');
const profissionaisRoutes = require('./routes/profissionaisRoutes');
const enderecoRoutes =
    require('./routes/enderecoRoutes');

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


app.listen(PORT, () => {

    console.log(
        `API rodando em http://localhost:${PORT}`
    );

});