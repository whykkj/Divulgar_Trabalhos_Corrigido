const express = require('express');

const router = express.Router();


// ==========================================
// GET /api/geocodificacao
// ==========================================

router.get('/', async (req, res) => {

    try {

        const {
            rua,
            numero,
            bairro,
            cidade,
            estado,
            cep
        } = req.query;


        // Cidade é obrigatória para evitar
        // pesquisas muito genéricas
        if (!cidade) {

            return res.status(400).json({
                erro: 'A cidade é obrigatória'
            });

        }


        // Monta o endereço
        const partesEndereco = [
            rua,
            numero,
            bairro,
            cidade,
            estado,
            cep,
            'Brasil'
        ];


        // Remove campos vazios
        const endereco = partesEndereco
            .filter(Boolean)
            .join(', ');


        // Monta a URL da API
        const url =
            `https://nominatim.openstreetmap.org/search` +
            `?q=${encodeURIComponent(endereco)}` +
            `&format=jsonv2` +
            `&limit=1` +
            `&countrycodes=br`;


        // Consulta o Nominatim
        const resposta = await fetch(url, {

            headers: {

                // Nominatim exige identificação da aplicação
                'User-Agent':
                    'DivulgarTrabalhos/1.0',

                'Accept-Language':
                    'pt-BR'

            }

        });


        if (!resposta.ok) {

            return res.status(502).json({
                erro: 'Erro ao consultar o serviço de geocodificação'
            });

        }


        const dados = await resposta.json();


        // Nenhum endereço encontrado
        if (dados.length === 0) {

            return res.status(404).json({
                erro: 'Endereço não encontrado'
            });

        }


        const local = dados[0];


        // Retorna somente o que interessa
        res.json({

            enderecoPesquisado: endereco,

            enderecoEncontrado:
                local.display_name,

            latitude:
                Number(local.lat),

            longitude:
                Number(local.lon)

        });


    } catch (erro) {

        console.error(
            'Erro na geocodificação:',
            erro
        );


        res.status(500).json({
            erro: 'Erro interno ao buscar coordenadas'
        });

    }

});


module.exports = router;