var _ = require('lodash')
var moment = require('moment')
var router = require('express').Router()

// GET home admin page.
// TODO Totally zero authetification
router.get('/', function(req, res, next) {
    req.models.users.find().limit(30).order('id').omit('passwordHash').all(function(err, users) {
        if (err) return next(err)

        res.render('admin', {
            users: JSON.stringify(users),
            title: 'admin panel'
        })
    })
})

router.get('/userinfo/:id', function(req, res, next) {
    var id = req.params.id
    var offlineTime
    var totalBytesSend
    var totalBytesRecivied
    var totalMessagesSend
    var totalMessagesGet
    var totalBytesSend
    var totalBytesSend
    var totalBytesSend
    var totalBytesSend

    // TODO Hate this callback hell

    req.models.users.get(id, function(err, user) {
        if (err) return next(err)

        // How long was offline
        offlineTime = moment(user.dateLastLogon).fromNow()

        // totalBytesSend
        req.db.driver.execQuery('SELECT sum(CHAR_LENGTH(body)) as X FROM msg.messages WHERE sender = ?', [id], function(err, data) {
            if (err) return next(err)
            totalBytesSend = data[0].X

            // totalBytesRecivied
            req.db.driver.execQuery('SELECT sum(CHAR_LENGTH(body)) as X FROM msg.messages WHERE recipient = ?', [id], function(err, data) {
                if (err) return next(err)
                totalBytesRecivied = data[0].X

                // totalMessagesSend
                req.db.driver.execQuery('SELECT count(*) as X FROM msg.messages WHERE sender = ?', [id], function(err, data) {
                    if (err) return next(err)
                    totalMessagesSend = data[0].X

                    // totalMessagesGet
                    req.db.driver.execQuery('SELECT count(*) as X FROM msg.messages WHERE recipient = ?', [id], function(err, data) {
                        if (err) return next(err)
                        totalMessagesGet = data[0].X

                        var userinfo = {
                            user: user,
                            offlineTime: offlineTime,
                            totalBytesSend: totalBytesSend,
                            totalBytesRecivied: totalBytesRecivied,
                            totalMessagesSend: totalMessagesSend,
                            totalMessagesGet: totalMessagesGet
                        }

                        res.render('userinfo', {
                            userinfo: userinfo
                        })
                    })
                })
            })
        })
    })
})

module.exports = router
