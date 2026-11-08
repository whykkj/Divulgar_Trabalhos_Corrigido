const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Profissional = sequelize.define('Profissional', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    profissao: {
        type: DataTypes.STRING,
        allowNull: false
    },

    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    telefone: {
        type: DataTypes.STRING,
        allowNull: true
    },

    cep: {
        type: DataTypes.STRING,
        allowNull: true
    },

    logradouro: {
        type: DataTypes.STRING,
        allowNull: true
    },

    numero: {
        type: DataTypes.STRING,
        allowNull: true
    },

    complemento: {
        type: DataTypes.STRING,
        allowNull: true
    },

    bairro: {
        type: DataTypes.STRING,
        allowNull: true
    },

    cidade: {
        type: DataTypes.STRING,
        allowNull: true
    },

    uf: {
        type: DataTypes.STRING,
        allowNull: true
    },

    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    }

}, {
    tableName: 'profissionais',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
});

module.exports = Profissional;