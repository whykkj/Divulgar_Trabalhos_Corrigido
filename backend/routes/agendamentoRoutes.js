const express = require('express');
const { Op } = require('sequelize');
    
const Agendamento =
    require('../models/Agendamento');

const Profissional =
    require('../models/Profissional');

const router = express.Router();


// ======================================================
// POST /api/agendamentos
// Criar agendamento
// ======================================================

router.post('/', async (req, res) => {

    try {

        const {
            cliente_id,
            profissional_id,
            data_hora_inicio,
            data_hora_fim,
            observacao
        } = req.body;


        // ------------------------------
        // VALIDAÇÕES
        // ------------------------------

        if (
            !cliente_id ||
            !profissional_id ||
            !data_hora_inicio
        ) {

            return res.status(400).json({
                erro:
                    'cliente_id, profissional_id e data_hora_inicio são obrigatórios'
            });

        }


        const profissional =
            await Profissional.findByPk(profissional_id);


        if (!profissional) {

            return res.status(404).json({
                erro: 'Profissional não encontrado'
            });

        }


        const inicio =
            new Date(data_hora_inicio);


        if (Number.isNaN(inicio.getTime())) {

            return res.status(400).json({
                erro: 'Data/hora de início inválida'
            });

        }


        let fim = null;

        if (data_hora_fim) {

            fim = new Date(data_hora_fim);

            if (Number.isNaN(fim.getTime())) {

                return res.status(400).json({
                    erro: 'Data/hora de término inválida'
                });

            }

            if (fim <= inicio) {

                return res.status(400).json({
                    erro:
                        'A data/hora de término deve ser posterior ao início'
                });

            }

        }


        // ------------------------------
        // VERIFICAR CONFLITO
        // ------------------------------

        const conflito =
            await Agendamento.findOne({
                where: {
                    profissional_id,
                    data_hora_inicio: inicio,
                    status: {
                     [Op.in]: [
                         'pendente',
                         'confirmado'
                        ]
        }
                }
            });


        if (conflito) {

            return res.status(409).json({
                erro:
                    'Este horário já possui um agendamento'
            });

        }


        // ------------------------------
        // CRIAR
        // ------------------------------

        const agendamento =
            await Agendamento.create({

                cliente_id,
                profissional_id,
                data_hora_inicio: inicio,
                data_hora_fim: fim,
                observacao,
                status: 'pendente'

            });


        res.status(201).json({

            mensagem:
                'Agendamento criado com sucesso',

            agendamento

        });


    } catch (erro) {

        console.error(
            'Erro ao criar agendamento:',
            erro
        );

        res.status(500).json({
            erro: 'Erro ao criar agendamento',
            detalhes: erro.message
        });

    }

});


// ======================================================
// GET /api/agendamentos/profissional/:id
// ======================================================

router.get('/profissional/:id', async (req, res) => {

    try {

        const profissional_id =
            Number(req.params.id);


        if (!Number.isInteger(profissional_id)) {

            return res.status(400).json({
                erro: 'ID do profissional inválido'
            });

        }


        const agendamentos =
            await Agendamento.findAll({

                where: {
                    profissional_id
                },

                order: [
                    ['data_hora_inicio', 'ASC']
                ]

            });


        res.json(agendamentos);


    } catch (erro) {

        console.error(
            'Erro ao buscar agendamentos:',
            erro
        );

        res.status(500).json({
            erro: 'Erro ao buscar agendamentos',
            detalhes: erro.message
        });

    }

});


module.exports = router;