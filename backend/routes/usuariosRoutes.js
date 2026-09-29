const express = require('express');
const router = express.Router();

const Usuario = require('../models/Usuario');

// CADASTRO
router.post('/', async (req, res) => {
    try {
        const { nome, email, senha, tipo } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: 'Nome, e-mail e senha são obrigatórios.'
            });
        }

        const emailNormalizado = email.trim().toLowerCase();

        const usuarioExistente = await Usuario.findOne({
            where: {
                email: emailNormalizado
            }
        });

        if (usuarioExistente) {
            return res.status(409).json({
                erro: 'Este e-mail já está cadastrado.'
            });
        }

        const usuario = await Usuario.create({
            nome: nome.trim(),
            email: emailNormalizado,
            senha,
            tipo: tipo || 'cliente'
        });

        return res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso.',
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });

    } catch (erro) {
        console.error('Erro ao cadastrar usuário:', erro);

        return res.status(500).json({
            erro: 'Erro ao cadastrar usuário.'
        });
    }
});


// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                erro: 'E-mail e senha são obrigatórios.'
            });
        }

        const usuario = await Usuario.findOne({
            where: {
                email: email.trim().toLowerCase()
            }
        });

        if (!usuario || usuario.senha !== senha) {
            return res.status(401).json({
                erro: 'E-mail ou senha incorretos.'
            });
        }

        return res.json({
            mensagem: 'Login realizado com sucesso.',
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });

    } catch (erro) {
        console.error('Erro no login:', erro);

        return res.status(500).json({
            erro: 'Erro ao realizar login.'
        });
    }
});

module.exports = router;