module.exports = (app) => {
    const users = require('../controllers/user.controller');

    // Register a new user
    app.post('/register', users.register);

    // Login a user
    app.post('/login', users.login);
}
