const express = require('express');

const router = express.Router();

router.get('/:cep', async (req, res) => {
    try {
        const cep = req.params.cep;

        // Remove tudo que não for número
        const cepLimpo = cep.replace(/\D/g, '');

        // Verifica se possui 8 números
        if (cepLimpo.length !== 8) {
            return res.status(400).json({
                erro: 'CEP inválido. Informe 8 números.'
            });
        }

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cepLimpo}/json/`
        );

        const dados = await resposta.json();

        if (dados.erro) {
            return res.status(404).json({
                erro: 'CEP não encontrado'
            });
        }

        res.json(dados);

    } catch (erro) {
        console.error('Erro ao consultar CEP:', erro);

        res.status(500).json({
            erro: 'Erro ao consultar o CEP'
        });
    }
});

module.exports = router;