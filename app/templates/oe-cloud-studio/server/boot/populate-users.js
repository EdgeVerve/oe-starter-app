var loopback = require('loopback');
var async = require('async');

module.exports = function (app, done) {
  var User = loopback.findModel('User');

  User.defineProperty('tenantId', { type: String });

  User.destroyAll({}, { ignoreAutoScope: true }, function (err) {
    if (err) {
      throw new Error('Error while destroying users from populate-user.js file');
    } else {
      var users = [
        {
          'username': 'admin',
          'password': 'Edge@2019$',
          'email': 'admin@config.db',
          'tenantId': '/default'
        }
      ];
      var fn = [];

      users.forEach((user) => {
        fn.push((callback) => { User.create(user, callback); });
      });

      async.series(fn, function (err, results) {
        if (err) {
          throw new Error('Error while creating user from populate-users.js boot file');
        } else {
          done();
        }
      });
    }
  });
};
