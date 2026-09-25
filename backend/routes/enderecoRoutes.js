const express = require('express');

const router = express.Router();

router.get('/:cep', async (req, res) => {
    try {
        // ==========================================
        // 1. VALIDAR CEP
        // ==========================================

        const cep = req.params.cep;

        const cepLimpo = cep.replace(/\D/g, '');

        if (cepLimpo.length !== 8) {
            return res.status(400).json({
                erro: 'CEP inválido. Informe 8 números.'
            });
        }


        // ==========================================
        // 2. CONSULTAR VIACEP
        // ==========================================

        const respostaViaCep = await fetch(
            `https://viacep.com.br/ws/${cepLimpo}/json/`
        );

        if (!respostaViaCep.ok) {
            return res.status(502).json({
                erro: 'Erro ao consultar o ViaCEP'
            });
        }

        const dadosCep = await respostaViaCep.json();


        if (dadosCep.erro) {
            return res.status(404).json({
                erro: 'CEP não encontrado'
            });
        }


        // ==========================================
        // 3. MONTAR ENDEREÇO
        // ==========================================

        const endereco = [
            dadosCep.logradouro,
            dadosCep.bairro,
            dadosCep.localidade,
            dadosCep.uf,
            dadosCep.cep,
            'Brasil'
        ]
            .filter(Boolean)
            .join(', ');


        // ==========================================
        // 4. CONSULTAR GEOLOCALIZAÇÃO
        // ==========================================

        const urlNominatim =
            'https://nominatim.openstreetmap.org/search' +
            `?q=${encodeURIComponent(endereco)}` +
            '&format=jsonv2' +
            '&limit=1' +
            '&countrycodes=br';


        const respostaGeo = await fetch(
            urlNominatim,
            {
                headers: {
                    'User-Agent': 'DivulgarTrabalhos/1.0',
                    'Accept-Language': 'pt-BR'
                }
            }
        );


        if (!respostaGeo.ok) {
            return res.status(502).json({
                erro: 'Erro ao consultar geolocalização'
            });
        }


        const dadosGeo = await respostaGeo.json();


        // ==========================================
        // 5. CASO NÃO ENCONTRE COORDENADAS
        // ==========================================

        if (dadosGeo.length === 0) {
            return res.json({
                cep: dadosCep.cep,
                logradouro: dadosCep.logradouro,
                bairro: dadosCep.bairro,
                cidade: dadosCep.localidade,
                estado: dadosCep.uf,

                latitude: null,
                longitude: null,

                aviso: 'Endereço encontrado, mas não foi possível obter as coordenadas.'
            });
        }


        // ==========================================
        // 6. PEGAR COORDENADAS
        // ==========================================

        const localizacao = dadosGeo[0];


        // ==========================================
        // 7. RESPOSTA FINAL
        // ==========================================

        res.json({
            cep: dadosCep.cep,

            logradouro: dadosCep.logradouro,

            bairro: dadosCep.bairro,

            cidade: dadosCep.localidade,

            estado: dadosCep.uf,

            latitude: Number(
                localizacao.lat
            ),

            longitude: Number(
                localizacao.lon
            )
        });


    } catch (erro) {

        console.error(
            'Erro ao buscar endereço:',
            erro
        );

        res.status(500).json({
            erro: 'Erro interno ao buscar endereço'
        });
    }
});


module.exports = router;