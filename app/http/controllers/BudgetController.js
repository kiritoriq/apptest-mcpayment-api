const { Budget, sequelize } = require('../../models/Budget');


const index = async (req, res) => {
    const [result, metadata] = await sequelize.query('SELECT * FROM budgets ORDER BY budget_date ASC');
    // balance(result);
    const income = incomeBalance(result);
    const expenses = expensesBalance(result);
    // console.log(expenses);
    const balance = parseInt(income) - parseInt(expenses);
    res.status(200).json({
        status: 'success',
        data: {
            budgets: result,
            balance: balance
        }
    })
};

const incomeBalance = (data) => {
    let amounts = [];
    data.forEach((value, index) => {
        if(value.budget_type === '1') {
            amounts.push(value.budget_amount);
        }
    })
    const amount = amounts.reduce((total, num) => {
        return total+num;
    })
    return amount;
}

const expensesBalance = (data) => {
    let amounts = [];
    data.forEach((value, index) => {
        if(value.budget_type === '2') {
            amounts.push(value.budget_amount);
        }
    })
    const amount = amounts.reduce((total, num) => {
        return total+num;
    })
    return amount;
    // return data.budget_type === "2";
}

const create = (req, res) => {
    if(
        req.body.budget_title &&
        req.body.budget_type &&
        req.body.budget_amount &&
        req.body.budget_date
    ) {
        Budget
            .create({
                budget_title: req.body.budget_title,
                budget_type: req.body.budget_type,
                budget_amount: req.body.budget_amount,
                budget_date: req.body.budget_date,
            })
            .then(response => {
                console.log(response);
                res.status(200).json({
                    status: 'success',
                    message: 'Saved successfully!'
                })
            })
            .catch(err => {
                console.log(err);
            })
            
    } else {
        res.status(400).send('Bad Request');
    }
};

const getById = (req, res) => {
    if(req.params.id) {
        Budget
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(response => {
                res.status(200).json({
                    status: 'success',
                    message: 'Get data by id successfully',
                    data: response
                });
            })
            .catch(err => {
                res.status(500).send({
                    status: 'failed',
                    message: err
                });
            })
    } else {
        res.status(400).send('Bad Request');
    }
}

const update = (req, res) => {
    if(req.params.id) {
        Budget
            .update({
                budget_title: req.body.budget_title,
                budget_type: req.body.budget_type,
                budget_amount: req.body.budget_amount,
                budget_date: req.body.budget_date,
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(response => {
                res.status(200).json({
                    status: 'success',
                    message: 'Data updated successfully'
                });
            })
            .catch(err => {
                res.status(500).send({
                    status: 'failed',
                    message: err
                })
            })
    } else {
        res.status(400).send('Bad Request');
    }
};

const destroy = (req, res) => {
    if(req.params.id) {
        Budget
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(response => {
                res.status(200).json({
                    status: 'success',
                    message: 'Data has been deleted'
                });
            })
            .catch(err => {
                res.status(500).send({
                    status: 'failed',
                    message: err
                })
            })
    } else {
        res.status(400).send('Bad Request');
    }
};

module.exports = {
    index,
    create,
    update,
    destroy,
    getById,
};