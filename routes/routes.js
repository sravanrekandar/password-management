var pagecontrol = require('./pages.js');

module.exports = function (app) {
    // Data responses
    //Product
    app.get('/pages/filter', pagecontrol.filter);
    app.get('/pages/:id', pagecontrol.get);
    app.get('/pages', pagecontrol.get);
    app.post('/pages/:id', pagecontrol.update);
    app.post('/pages', pagecontrol.create);
    app.delete('/pages/:id', pagecontrol.delete);

    // File responses
    app.get('/bower_components/*', function (req, res) {
        res.sendfile(req.url.substr(1)); // removing the first character '/'
    });
};