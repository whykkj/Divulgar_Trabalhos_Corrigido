const sequelize = require('./database/database');
const Profissional = require('./models/Profissional');

async function iniciar() {

    await sequelize.sync();

    await Profissional.bulkCreate([
        {
            nome: 'Carlos',
            profissao: 'Eletricista',
            categoria: 'Construção',
            latitude: -1.4600,
            longitude: -48.4950
        },

        {
            nome: 'João',
            profissao: 'Pedreiro',
            categoria: 'Construção',
            latitude: -1.4800,
            longitude: -48.5100
        },

        {
            nome: 'Marcos',
            profissao: 'Pintor',
            categoria: 'Construção',
            latitude: -1.5500,
            longitude: -48.6000
        },

        {
            nome: 'Ana',
            profissao: 'Cabeleireira',
            categoria: 'Beleza',
            latitude: -1.4620,
            longitude: -48.4970
        },

        {
            nome: 'Lucas',
            profissao: 'Fotógrafo',
            categoria: 'Fotografia',
            latitude: -1.4700,
            longitude: -48.5000
        }
    ]);

    console.log('Profissionais cadastrados!');

    await sequelize.close();
}

iniciar();