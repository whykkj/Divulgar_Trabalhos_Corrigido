const express = require('express');
const calcularDistancia = require('../utils/calcularDistancia');

const router = express.Router();

router.get('/', (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({
            erro: 'Latitude e longitude são obrigatórias'
        });
    }

    const lat = Number(latitude);
    const lon = Number(longitude);

    if (isNaN(lat) || isNaN(lon)) {
        return res.status(400).json({
            erro: 'Latitude e longitude devem ser números'
        });
    }

    res.json({
        mensagem: 'Localização recebida com sucesso',
        latitude: lat,
        longitude: lon
    });
});

router.get('/distancia', (req, res) => {
    const {
        latCliente,
        lonCliente,
        latProfissional,
        lonProfissional
    } = req.query;

    if (
        !latCliente ||
        !lonCliente ||
        !latProfissional ||
        !lonProfissional
    ) {
        return res.status(400).json({
            erro: 'Todas as coordenadas são obrigatórias'
        });
    }

    const distancia = calcularDistancia(
        Number(latCliente),
        Number(lonCliente),
        Number(latProfissional),
        Number(lonProfissional)
    );

    res.json({
        distancia: Number(distancia.toFixed(2)),
        unidade: 'km'
    });
});

module.exports = router;