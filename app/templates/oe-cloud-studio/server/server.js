/**
 *
 * ©2016-2017 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 *
 */

/* eslint-disable no-console */
const oecloud = require('oe-cloud');
const path = require('path');

oecloud.boot(__dirname, function (err) {
  if (err) {
    console.error(err);
  }
  oecloud.start();
  oecloud.emit('loaded');
});


var clientPath = '../build/webpack';
oecloud.get('/', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, clientPath) });
});


module.exports = oecloud;
