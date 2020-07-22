/* eslint-disable no-console */
var oecloud = require('oe-cloud');
var path = require('path');
process.env.ENABLE_COOKIE = process.env.ENABLE_COOKIE || true;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
oecloud.boot(__dirname, function (err) {
  if (err) {
    console.error(err);
  }
  oecloud.start();
  oecloud.emit('loaded');
});

var subPath = oecloud.get('subPath') || '';
var ensureLoggedIn = function ensureLoggedIn(req, res, next) {
  if (req.accessToken) {
    next();
  } else {
    res.redirect(subPath + '/login');
    return;
  }
};
var clientPath = '../build/webpack';
oecloud.get('/', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, clientPath) });
});
