const express = require('express');
const { Op } = require('sequelize');
    
const Agendamento =
    require('../models/agendamento');

const Profissional =
    require('../models/profissional');
const Usuario = require('../models/Usuario');

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

        const cliente = await Usuario.findByPk(cliente_id);


        if (!cliente || cliente.tipo !== 'cliente') {
            return res.status(400).json({ erro: 'A conta informada não é uma conta de cliente válida.' });
        }

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


        if (inicio <= new Date()) {
            return res.status(400).json({ erro: 'Não é possível agendar em uma data ou horário passado.' });
        }

        // Quando o cliente não informa duração, reserva um intervalo padrão de 1 hora.
        let fim = new Date(inicio.getTime() + 60 * 60 * 1000);

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

        const agendamentosAtivos = await Agendamento.findAll({
            where: {
                profissional_id,
                status: { [Op.in]: ['pendente', 'confirmado'] }
            },
            attributes: ['id', 'data_hora_inicio', 'data_hora_fim']
        });

        const conflito = agendamentosAtivos.find((item) => {
            const inicioExistente = new Date(item.data_hora_inicio);
            const fimExistente = item.data_hora_fim
                ? new Date(item.data_hora_fim)
                : new Date(inicioExistente.getTime() + 60 * 60 * 1000);
            return inicio < fimExistente && fim > inicioExistente;
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


// GET /api/agendamentos/cliente/:id
router.get('/cliente/:id', async (req, res) => {
    try {
        const clienteId = Number(req.params.id);
        if (!Number.isInteger(clienteId) || clienteId <= 0) {
            return res.status(400).json({ erro: 'ID do cliente inválido.' });
        }
        const cliente = await Usuario.findByPk(clienteId);
        if (!cliente || cliente.tipo !== 'cliente') {
            return res.status(404).json({ erro: 'Cliente não encontrado.' });
        }
        const agendamentos = await Agendamento.findAll({
    where: { cliente_id: clienteId },
    include: [
        {
            model: Profissional,
            attributes: ['id', 'nome', 'profissao', 'categoria']
        }
    ],
    order: [['data_hora_inicio', 'DESC']]
});
        return res.json(agendamentos);
    } catch (erro) {
        console.error('Erro ao buscar agendamentos do cliente:', erro);
        return res.status(500).json({ erro: 'Erro ao buscar agendamentos do cliente.' });
    }
});

module.exports = router;