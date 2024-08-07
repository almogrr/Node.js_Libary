module.exports = (app) => {
    const books = require('../controllers/book.controller');
    const authenticateToken = require('../middleware/auth.middleware');

    // Create a new Book
    app.post('/books', authenticateToken, books.create);

    // Retrieve all Books
    app.get('/books', authenticateToken, books.findAll);

    // Retrieve a single Book with bookId
    app.get('/books/:bookId', authenticateToken, books.findOne);

    // Update a Book with bookId
    app.put('/books/:bookId', authenticateToken, books.update);

    // Delete a Book with bookId
    app.delete('/books/:bookId', authenticateToken, books.delete);
};
