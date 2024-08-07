module.exports = (app) => {
    const loans = require('../controllers/loan.controller');
    const authenticateToken = require('../middleware/auth.middleware');

    app.post('/loans', authenticateToken, loans.create);
    app.get('/loans', authenticateToken, loans.findAll);
    app.get('/loans/:loanId', authenticateToken, loans.findOne);
    app.put('/loans/:loanId', authenticateToken, loans.update);
    app.delete('/loans/:loanId', authenticateToken, loans.delete);
    app.post('/loans/:loanId/return', authenticateToken, loans.returnLoan);
}
