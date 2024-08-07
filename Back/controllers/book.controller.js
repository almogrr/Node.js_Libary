const Book = require('../models/book.model');

// Create and Save a new Book
exports.create = (req, res) => {
    const { name, image_path } = req.body;
    const book = new Book({ name, image_path, customer_id: req.user._id });

    book.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while creating the book." });
        });
};

// Retrieve and return all books from the database
exports.findAll = (req, res) => {
    Book.find()
        .then(books => {
            console.log("Books retrieved");
            res.send(books);
        })
        .catch(err => {
            console.log(`Error retrieving books: ${err.message}`);
            res.status(500).send({ message: err.message || "Error retrieving books" });
        });
};

// Find a single book with a bookId
exports.findOne = (req, res) => {
    Book.findById(req.params.bookId)
        .then(book => {
            if (!book) {
                console.log(`Book not found: id ${req.params.bookId}`);
                return res.status(404).send({ message: "Book not found with id " + req.params.bookId });
            }
            console.log(`Book retrieved: id ${req.params.bookId}`);
            res.send(book);
        })
        .catch(err => {
            console.log(`Error retrieving book: ${err.message}`);
            res.status(500).send({ message: "Error retrieving book with id " + req.params.bookId });
        });
};

// Update a book identified by the bookId in the request
exports.update = (req, res) => {
    if (!req.body.name) {
        console.log("Book update failed: name is required");
        return res.status(400).send({ message: "Book name can not be empty" });
    }

    Book.findByIdAndUpdate(req.params.bookId, {
        name: req.body.name,
        image_path: req.body.image_path,
        customer_id: req.body.customer_id
    }, { new: true })
        .then(book => {
            if (!book) {
                console.log(`Book not found for update: id ${req.params.bookId}`);
                return res.status(404).send({ message: "Book not found with id " + req.params.bookId });
            }
            console.log(`Book updated: id ${req.params.bookId}`);
            res.send(book);
        })
        .catch(err => {
            console.log(`Error updating book: ${err.message}`);
            res.status(500).send({ message: "Error updating book with id " + req.params.bookId });
        });
};

// Delete a book with the specified bookId in the request
exports.delete = (req, res) => {
    Book.findByIdAndRemove(req.params.bookId)
        .then(book => {
            if (!book) {
                console.log(`Book not found for deletion: id ${req.params.bookId}`);
                return res.status(404).send({ message: "Book not found with id " + req.params.bookId });
            }
            console.log(`Book deleted: id ${req.params.bookId}`);
            res.send({ message: "Book deleted successfully!" });
        })
        .catch(err => {
            console.log(`Error deleting book: ${err.message}`);
            res.status(500).send({ message: "Could not delete book with id " + req.params.bookId });
        });
};
