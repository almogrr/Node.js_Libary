const fs = require('fs');
const path = require('path');
const util = require('util');

// Create a writable stream to log to a file
const logFile = fs.createWriteStream(path.join(__dirname, '../debug.log'), { flags: 'a' });

// Store the original console.log
const logStdout = process.stdout;

// Overwrite console.log to log to file and stdout
console.log = function(d) {
    logFile.write(util.format(d) + '\n');
    logStdout.write(util.format(d) + '\n');
};

// Middleware for logging request details and response time
const loggingMiddleware = (req, res, next) => {
    const start = Date.now();
    const { method, url } = req;
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        const { statusCode } = res;
        const log = `${method} ${url} ${statusCode} ${duration}ms\n`;
        logFile.write(log);
        // console.log(log); // Also log to console
    });

    next();
};

module.exports = loggingMiddleware;
