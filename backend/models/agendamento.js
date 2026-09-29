const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Agendamento = sequelize.define('Agendamento', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    profissional_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    data_hora_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },

    data_hora_fim: {
        type: DataTypes.DATE,
        allowNull: true
    },

    status: {
        type: DataTypes.ENUM(
            'pendente',
            'confirmado',
            'cancelado',
            'concluido'
        ),
        allowNull: false,
        defaultValue: 'pendente'
    },

    observacao: {
        type: DataTypes.TEXT,
        allowNull: true
    }

}, {
    tableName: 'agendamentos',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
});

module.exports = Agendamento;