var _ = require('lodash-node');
var pages = require('./pages.json');
var generateNewId = function () {
    var id,
        limit = pages.length;
    id = 'page' + limit;
    while (_.find(pages, {id: id})) {
        id = 'page' + (++limit);
    }
    return id;
}

var getpage = function(id) {
	var page;
	if (id === undefined) {
        return pages;
    } else {
        page = _.find(pages, {id: id});
        return page;
    }
};

exports.getpage = getpage;
// To handle requests from client
exports.get = function (req, res) {
    var id = req.param('id');
    res.send(getpage(id));
};

exports.update = function (req, res) {
    var id = req.param('id'),
        page = _.find(pages, {id: id});
    _.extend(page, req.body);

    var dataString = JSON.stringify(page);
    res.json({
        message: 'Edited the page with id ' + id + '. The existing object is..' + dataString
    });
};


exports.create = function (req, res) {
    var newId = generateNewId(),
        newpage = _.extend({}, req.body, {id: newId});

    pages.push(newpage)
    res.json({
        message: 'Created a new page, id :  ' + newpage.id
    });
};

exports.delete = function (req, res) {
    var id = req.param('id');
    _.pull(pages, _.find(pages, {id: id}));
    res.json({
        message: 'Deletes the page with id ' + id
    });
};

exports.filter = function (req, res) {
    var filter = req.query;
    var results = _.filter(pages, function (item) {
        var key,
            str;
        for (key in filter) {
            if (filter.hasOwnProperty((key))) {
                if (typeof  filter[key] === 'string') {
                    str = filter[key].toUpperCase();
                    if (item[key].toUpperCase().indexOf(str) !== -1) {
                        return true;
                    }
                }
            }
        }
        return false;
    });
    res.json(results);
};