var _ = require('lodash');
var router = require('express').Router();
var randomstring = require("randomstring");

// GET all users
router.get('/', function (req, res, next) {
    req.models.users.find().order('id').omit("passwordHash").all(function (err, users) {
        if (err) return next(err);

        res.json({
            items: users,
            result: "ok"
        });
    });
});

// GET user by id
router.get('/:id([0-9]+)', function (req, res, next) {
    var id = req.params.id;

    req.models.users.find({
        id: id
    }).omit("passwordHash").run(function (err, users) {
        if (err) return next(err);

        res.json({
            items: users,
            result: "ok"
        });
    });
});

// GET all messages by recipient id
router.get('/:id/messages', function (req, res, next) {
    var id = req.params.id;

    req.models.messages.find({
        recipient: id
    }, function (err, messages) {
        if (err) return next(err);

        res.json({
            items: messages,
            result: "ok"
        });
    });
});

// POST new user
router.post('/', function (req, res, next) {
    var params = _.pick(req.body, 'login', 'passwordHash', 'info');
    params.dateCreated = new Date().toISOString().slice(0, 19).replace('T', ' ');

    req.models.users.create(params, function (err, users) {
        if (err) return next(err);

        return res.status(201).json({
            items: users,
            result: "ok"
        });
    });
});

// POST new message to recipient
router.post('/:id/messages', function (req, res, next) {
    var id = req.params.id;
    var params = _.pick(req.body, 'sender', 'body');
    params.dateSend = new Date().toISOString().slice(0, 19).replace('T', ' ');
    params.recipient = id;

    req.models.messages.create(params, function (err, message) {
        if (err) return next(err);

        return res.status(201).json({
            items: message,
            result: "ok"
        });
    });
});

// PUT by id
router.put('/:id', function (req, res, next) {
    var id = req.params.id;
    var params = _.pick(req.body, 'login', 'passwordHash', 'info', 'dateCreated', 'dateLastLogon');

    req.models.users.get(id, function (err, user) {
        if (err) return next(err);

        user.login = params.login ? params.login : user.login;
        user.passwordHash = params.passwordHash ? params.passwordHash : user.passwordHash;
        user.info = params.info ? params.info : user.info;
        user.dateCreated = params.dateCreated ? params.dateCreated : user.dateCreated;
        user.dateLastLogon = params.dateLastLogon ? params.dateLastLogon : user.dateLastLogon;
        user.id = id;
        user.save(function (err) {
            if (err) return next(err);
        })

        res.status(201).json({
            items: user,
            result: "ok"
        });
    });
});

// delete by id
router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    req.models.users.get(id, function (err, user) {
        if (err) return next(err);
        user.remove(function (err) {
            if (err) return next(err);
        })

        res.json({
            result: "ok"
        });
    });
});

// Generate random
router.get('/generator', function (req, res, next) {
    var login = randomstring.generate({
        length: randomInt(4, 25),
        charset: 'alphabetic'
    });
    var passwordHash = randomstring.generate({
        length: randomInt(4, 120),
        charset: 'alphabetic'
    });
    var info = randomstring.generate({
        length: randomInt(0, 1000),
        charset: 'alphabetic'
    });

    var dateCreated = randomDate(new Date(2012, 0, 1), new Date()).toISOString().slice(0, 19).replace('T', ' ');
    var dateLastLogon = randomDate(new Date(2012, 0, 1), new Date()).toISOString().slice(0, 19).replace('T', ' ');

    var newUser = {
        login: login,
        passwordHash: passwordHash,
        info: info,
        dateCreated: dateCreated,
        dateLastLogon: dateLastLogon
    };

    req.models.users.create(newUser, function (err, users) {
        if (err) return next(err);

        return res.json({
            items: users,
            result: "ok"
        });
    });
});

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = router;