const express = require('express');
const budgetRoutes = express.Router();
const BudgetController = require('../app/http/controllers/BudgetController');

budgetRoutes.get('/', BudgetController.index);
budgetRoutes.post('/', BudgetController.create);
budgetRoutes.get('/:id', BudgetController.getById);
budgetRoutes.put('/:id', BudgetController.update);
budgetRoutes.delete('/:id', BudgetController.destroy);

module.exports = budgetRoutes;