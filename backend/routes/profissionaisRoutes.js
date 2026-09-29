const express = require('express');

const calcularDistancia =
    require('../utils/calcularDistancia');

const Profissional =
    require('../models/Profissional');

const router = express.Router();


// ======================================================
// GET /api/profissionais/proximos
// ======================================================

router.get('/proximos', async (req, res) => {

    try {

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


        // ==================================================
        // BUSCAR PROFISSIONAIS NO BANCO
        // ==================================================

        let resultado = await Profissional.findAll({
            raw: true
        });


        // ==================================================
        // BUSCA
        // ==================================================

        if (busca) {

            const textoBusca =
                busca.toLowerCase().trim();


            resultado = resultado.filter(
                (profissional) => {

                    const nome =
                        (profissional.nome || '').toLowerCase();

                    const profissaoProfissional =
                        (profissional.profissao || '').toLowerCase();


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
                    (profissional.profissao || '')
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
                    (profissional.categoria || '')
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
                        Number(profissional.latitude),
                        Number(profissional.longitude)
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

    } catch (erro) {

        console.error(
            'Erro ao buscar profissionais próximos:',
            erro
        );

        res.status(500).json({
            erro: 'Erro ao buscar profissionais',
            detalhes: erro.message
        });

    }

});


// ======================================================
// GET /api/profissionais/:id
// ======================================================

router.get('/:id', async (req, res) => {

    try {

        const id = Number(req.params.id);


        if (!Number.isInteger(id)) {

            return res.status(400).json({
                erro: 'ID inválido'
            });

        }


        const profissional =
            await Profissional.findByPk(id);


        if (!profissional) {

            return res.status(404).json({
                erro: 'Profissional não encontrado'
            });

        }


        res.json(profissional);

    } catch (erro) {

        console.error(
            'Erro ao buscar profissional por ID:',
            erro
        );

        res.status(500).json({
            erro: 'Erro ao buscar profissional',
            detalhes: erro.message
        });

    }

});


// ======================================================
// POST /api/profissionais
// ======================================================

router.post('/', async (req, res) => {

    try {

        const profissional =
            await Profissional.create(req.body);


        res.status(201).json({

            mensagem:
                'Profissional cadastrado com sucesso',

            profissional

        });

    } catch (erro) {

        console.error(
            'Erro ao cadastrar profissional:',
            erro
        );

        res.status(500).json({
            erro: 'Erro ao cadastrar profissional',
            detalhes: erro.message
        });

    }

});


// ======================================================
// EXPORTAR ROUTER
// ======================================================

module.exports = router;