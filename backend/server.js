const express = require('express');
const cors = require('cors');
require('dotenv').config();

const cepRoutes = require('./routes/cepRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cep', cepRoutes);

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API funcionando!'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});