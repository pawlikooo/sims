var http = require('http')
var models = require('../models/');
var config = require('../config');

models(function (err, db) {
    if (err) throw err;

    db.drop(function (err) {
        if (err) throw err;

        db.sync(function (err) {
            if (err) throw err;

            db.close()

            // much prefer use siege
            //   siege -c100 -b -t1M http://localhost:3000/messages/generator
            //   siege -c100 -t1M http://localhost:3000/users/generator
            
            // for (var i = 0; i < config.generator.usersCount; i++) {
            //     http.get('http://localhost:' + config.port + '/users/generator');
            // };
            // for (var i = 0; i < config.generator.messagesCount; i++) {
            //     http.get('http://localhost:' + config.port + '/messages/generator');
            // }
            
            console.log('Done');
        });
    });
});