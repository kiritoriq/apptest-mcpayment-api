const { sequelize, DataTypes } = require('../../db');

const Budget = sequelize.define('budgets', {
    budget_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    budget_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    budget_amount: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    budget_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true
});

// (async () => {
//     await sequelize.sync({ force: true });
//     // Code here
// })();

module.exports = {
    Budget,
    sequelize
};