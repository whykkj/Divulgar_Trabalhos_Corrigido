const express = require('express');

const calcularDistancia =
    require('../utils/calcularDistancia');

const profissionais =
    require('../data/profissionais');

const router = express.Router();


// ======================================================
// GET /api/profissionais/proximos
// ======================================================

router.get('/proximos', (req, res) => {

    const {
        latitude,
        longitude,
        raio,
        profissao,
        categoria,
        busca
    } = req.query;


    // ==================================================
    // VALIDAÇÃO
    // ==================================================

    if (!latitude || !longitude) {

        return res.status(400).json({
            erro: 'Latitude e longitude são obrigatórias'
        });

    }


    const latCliente = Number(latitude);
    const lonCliente = Number(longitude);

    const raioKm =
        raio ? Number(raio) : 5;


    if (
        !Number.isFinite(latCliente) ||
        !Number.isFinite(lonCliente) ||
        !Number.isFinite(raioKm)
    ) {

        return res.status(400).json({
            erro: 'Latitude, longitude e raio devem ser números'
        });

    }


    if (
        latCliente < -90 ||
        latCliente > 90 ||
        lonCliente < -180 ||
        lonCliente > 180
    ) {

        return res.status(400).json({
            erro: 'Latitude ou longitude inválida'
        });

    }


    if (raioKm <= 0) {

        return res.status(400).json({
            erro: 'O raio deve ser maior que zero'
        });

    }


    // Fazemos uma cópia do array
    let resultado = [...profissionais];


    // ==================================================
    // BUSCA
    // ==================================================

    if (busca) {

        const textoBusca =
            busca.toLowerCase().trim();


        resultado = resultado.filter(
            (profissional) => {

                const nome =
                    profissional.nome.toLowerCase();

                const profissaoProfissional =
                    profissional.profissao.toLowerCase();


                return (
                    nome.includes(textoBusca) ||
                    profissaoProfissional.includes(textoBusca)
                );

            }
        );

    }


    // ==================================================
    // PROFISSÃO
    // ==================================================

    if (profissao) {

        const textoProfissao =
            profissao.toLowerCase().trim();


        resultado = resultado.filter(
            (profissional) =>
                profissional.profissao
                    .toLowerCase()
                    .includes(textoProfissao)
        );

    }


    // ==================================================
    // CATEGORIA
    // ==================================================

    if (categoria) {

        const textoCategoria =
            categoria.toLowerCase().trim();


        resultado = resultado.filter(
            (profissional) =>
                profissional.categoria
                    .toLowerCase()
                    .includes(textoCategoria)
        );

    }


    // ==================================================
    // CALCULAR DISTÂNCIAS
    // ==================================================

    resultado = resultado.map(
        (profissional) => {

            const distancia =
                calcularDistancia(
                    latCliente,
                    lonCliente,
                    profissional.latitude,
                    profissional.longitude
                );


            return {

                ...profissional,

                distancia:
                    Number(
                        distancia.toFixed(2)
                    )

            };

        }
    );


    // ==================================================
    // FILTRAR PELO RAIO
    // ==================================================

    resultado = resultado.filter(
        (profissional) =>
            profissional.distancia <= raioKm
    );


    // ==================================================
    // ORDENAR
    // ==================================================

    resultado.sort(
        (a, b) =>
            a.distancia - b.distancia
    );


    // ==================================================
    // RESPOSTA
    // ==================================================

    res.json({

        filtros: {

            latitude: latCliente,

            longitude: lonCliente,

            raio: raioKm,

            profissao:
                profissao || null,

            categoria:
                categoria || null,

            busca:
                busca || null
        },

        quantidade:
            resultado.length,

        profissionais:
            resultado

    });

});


module.exports = router;