const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    name: { type: String, required: true },
    image_path: { type: String, required: false },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    loans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);
