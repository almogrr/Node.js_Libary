const mongoose = require('mongoose');

const LoanSchema = mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', nullable: true },
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', nullable: true },
    loan_date: { type: Date, default: Date.now },
    return_date: { type: Date, default: () => new Date(+new Date() + 7*24*60*60*1000) },
    is_late: { type: Boolean, default: false }
}, {
    timestamps: true
});

// Method to return the loan
LoanSchema.methods.returnLoan = function() {
    const now = new Date();
    const loanDuration = (now - this.loan_date) / (1000 * 60 * 60); // Duration in hours
    if (loanDuration > 2) {
        this.is_late = true;
    }
    this.return_date = now;
    return this.save();
};

module.exports = mongoose.model('Loan', LoanSchema);
