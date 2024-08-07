const jwt = require('jsonwebtoken');
const { debug } = require('winston');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send({ message: 'Access Denied: No Token Provided!' });

    const token = authHeader.split(' ')[1];
    // console.log('Token:', token); // Log the token

    if (!token) return res.status(401).send({ message: 'Access Denied: No Token Provided!' });

    try {
        console.log(`ttt${token}`);
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.error('Token verification error:', err); // Log the error
        res.status(400).send({ message: 'Invalid Token' });
    }
};

module.exports = authenticateToken;
