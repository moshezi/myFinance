'use strict';

/**
 * Module dependencies
 */
var expensesPolicy = require('../policies/expenses.server.policy'),
  expenses = require('../controllers/expenses.server.controller');

module.exports = function(app) {
  // Expenses Routes
  app.route('/api/expenses').all(expensesPolicy.isAllowed)
    .get(expenses.list)
    .post(expenses.create);

  app.route('/api/expenses/:expenseId').all(expensesPolicy.isAllowed)
    .get(expenses.read)
    .put(expenses.update)
    .delete(expenses.delete);
    
  app.route('/api/user-expenses/:userId').all(expensesPolicy.isAllowed)
    .get(expenses.read)
  
  app.param('userId', expenses.expenseByUserID);
  // Finish by binding the Expense middleware
  app.param('expenseId', expenses.expenseByID);
};
