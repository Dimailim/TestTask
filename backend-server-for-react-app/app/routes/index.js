const createOrder = require('./CreateOrder');

module.exports = function (app, db) {
    createOrder(app, db);
};