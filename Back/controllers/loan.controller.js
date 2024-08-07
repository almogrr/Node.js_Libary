const Loan = require('../models/loan.model');

exports.create = (req, res) => {
    const loan = new Loan({
        customer_id: req.user._id,
        book_id: req.body.book_id,
        loan_date: new Date(),
        return_date: null // or calculate based on a week
    });

    loan.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while creating the loan." });
        });
};

// Retrieve and return all loans from the database
exports.findAll = (req, res) => {
    Loan.find()
        .then(loans => {
            console.log("Loans retrieved");
            res.send(loans);
        })
        .catch(err => {
            console.log(`Error retrieving loans: ${err.message}`);
            res.status(500).send({ message: err.message || "Error retrieving loans" });
        });
};

// Find a single loan with a loanId
exports.findOne = (req, res) => {
    Loan.findById(req.params.loanId)
        .then(loan => {
            if (!loan) {
                console.log(`Loan not found: id ${req.params.loanId}`);
                return res.status(404).send({ message: "Loan not found with id " + req.params.loanId });
            }
            console.log(`Loan retrieved: id ${req.params.loanId}`);
            res.send(loan);
        })
        .catch(err => {
            console.log(`Error retrieving loan: ${err.message}`);
            res.status(500).send({ message: "Error retrieving loan with id " + req.params.loanId });
        });
};

// Update a loan identified by the loanId in the request
exports.update = (req, res) => {
    Loan.findByIdAndUpdate(req.params.loanId, {
        customer_id: req.body.customer_id,
        book_id: req.body.book_id,
        return_date: req.body.return_date
    }, { new: true })
        .then(loan => {
            if (!loan) {
                console.log(`Loan not found for update: id ${req.params.loanId}`);
                return res.status(404).send({ message: "Loan not found with id " + req.params.loanId });
            }
            console.log(`Loan updated: id ${req.params.loanId}`);
            res.send(loan);
        })
        .catch(err => {
            console.log(`Error updating loan: ${err.message}`);
            res.status(500).send({ message: "Error updating loan with id " + req.params.loanId });
        });
};

// Delete a loan with the specified loanId in the request
exports.delete = (req, res) => {
    Loan.findByIdAndRemove(req.params.loanId)
        .then(loan => {
            if (!loan) {
                console.log(`Loan not found for deletion: id ${req.params.loanId}`);
                return res.status(404).send({ message: "Loan not found with id " + req.params.loanId });
            }
            console.log(`Loan deleted: id ${req.params.loanId}`);
            res.send({ message: "Loan deleted successfully!" });
        })
        .catch(err => {
            console.log(`Error deleting loan: ${err.message}`);
            res.status(500).send({ message: "Could not delete loan with id " + req.params.loanId });
        });
};
exports.returnLoan = (req, res) => {
    Loan.findById(req.params.loanId)
        .then(loan => {
            if (!loan) {
                console.log(`Loan not found: id ${req.params.loanId}`);
                return res.status(404).send({ message: "Loan not found with id " + req.params.loanId });
            }
            loan.returnLoan()
                .then(updatedLoan => {
                    console.log(`Loan returned: id ${req.params.loanId}, late: ${updatedLoan.is_late}`);
                    res.send(updatedLoan);
                })
                .catch(err => {
                    console.log(`Error returning loan: ${err.message}`);
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            console.log(`Error retrieving loan: ${err.message}`);
            res.status(500).send({ message: "Error retrieving loan with id " + req.params.loanId });
        });
};
