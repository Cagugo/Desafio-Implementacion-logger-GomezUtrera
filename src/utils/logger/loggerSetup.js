const loggerMiddleware = require('./loggerMiddleware');
const req = {};
loggerMiddleware(req, null, () => {});

module.exports = req;
