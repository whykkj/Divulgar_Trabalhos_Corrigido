const express = require('express');
const router = express.Router();

const Usuario = require('../models/Usuario');
const crypto = require('crypto');
const { promisify } = require('util');
const scryptAsync = promisify(crypto.scrypt);

async function gerarHashSenha(senha) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = await scryptAsync(senha, salt, 64);
    return `scrypt$${salt}$${hash.toString('hex')}`;
}

async function verificarSenha(senha, armazenada) {
    if (!armazenada || !armazenada.startsWith('scrypt$')) return false;
    const [, salt, hashSalvo] = armazenada.split('$');
    if (!salt || !hashSalvo) return false;
    const hash = await scryptAsync(senha, salt, 64);
    const esperado = Buffer.from(hashSalvo, 'hex');
    return esperado.length === hash.length && crypto.timingSafeEqual(hash, esperado);
}

// CADASTRO
router.post('/', async (req, res) => {
    try {
        const { nome, email, senha, tipo } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: 'Nome, e-mail e senha são obrigatórios.'
            });
        }

        if (String(senha).length < 6) {
            return res.status(400).json({ erro: 'A senha deve ter pelo menos 6 caracteres.' });
        }

        if (!['cliente', 'empreendedor'].includes(tipo || 'cliente')) {
            return res.status(400).json({ erro: 'Tipo de conta inválido.' });
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
            senha: await gerarHashSenha(String(senha)),
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

        if (!usuario) {
            return res.status(401).json({
                erro: 'E-mail ou senha incorretos.'
            });
        }

        let senhaValida = await verificarSenha(String(senha), usuario.senha);

        // Migra automaticamente senhas antigas em texto puro no primeiro login.
        if (!senhaValida && !String(usuario.senha).startsWith('scrypt$') && usuario.senha === senha) {
            senhaValida = true;
            usuario.senha = await gerarHashSenha(String(senha));
            await usuario.save();
        }

        if (!senhaValida) {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
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