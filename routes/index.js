const newsRouter = require('./news');
const categoryRouter = require('./category');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/cat', categoryRouter);
}

module.exports = route;
