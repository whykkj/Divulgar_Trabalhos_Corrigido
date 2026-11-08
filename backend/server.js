require('dotenv').config();

const sequelize = require('./database/database');
const Profissional = require('./models/profissional');
const Agendamento = require('./models/agendamento');

Agendamento.belongsTo(Profissional, {
    foreignKey: 'profissional_id',
    as: 'profissional'
});

Profissional.hasMany(Agendamento, {
    foreignKey: 'profissional_id',
    as: 'agendamentos'
});

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

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', mensagem: 'API funcionando.' });
});

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

async function iniciarServidor() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Banco MySQL conectado!');

        app.listen(PORT, () => {
            console.log(`API rodando em http://localhost:${PORT}`);
        });
    } catch (erro) {
        console.error('Não foi possível iniciar: verifique a conexão e as tabelas do MySQL.', erro);
        process.exit(1);
    }
}

iniciarServidor();

