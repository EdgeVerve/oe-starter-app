var loopback = require('loopback');

module.exports = function (app) {
  var accessToken = loopback.findModel('AccessToken');
  accessToken.observe('before save', function (ctx, next) {
    var UserModel = loopback.findModel('User');
    if (!ctx.isNewInstance) {
      return next();
    }
    var instance = ctx.instance;
    UserModel.find({ where: { id: instance.userId } }, {}, function (err, result) {
      if (err) {
        return next(err);
      }
      if (result.length !== 1) {
        return next(new Error('No User Found'));
      }
      // var user = result[0];
      if (!instance.ctx) {
        instance.ctx = {};
      }
      instance.ctx.tenantId = result[0].tenantId;
      return next();
    });
  });
};
