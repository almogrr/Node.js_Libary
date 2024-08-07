const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

// Register a new user
exports.register = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8), // Hash the password
        is_admin: req.body.is_admin || false
    });

    user.save()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

// Login an existing user
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).send({ message: 'User not found' });

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(401).send({ message: 'Invalid credentials' });
        
        // Generate JWT
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token, user });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract the token
    if (!token) return res.status(401).send({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.error('Token verification error:', err); // Log the error
        res.status(400).send({ message: 'Invalid token verifyToken/user controller' });
    }
};
