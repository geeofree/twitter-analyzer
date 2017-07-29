'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

var _interface = require('../twitter/interface.twitter');

var _interface2 = _interopRequireDefault(_interface);

var _config = require('../twitter/config.twitter');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var API = (0, _interface2.default)(_config2.default);

router.get('/:twitterHandle', function (req, res) {
  var twitterHandle = req.params.twitterHandle;


  API.getUserTweets(twitterHandle).then(function (data) {
    return data.forEach(function (item) {
      return _server2.default.emit('receive:tweets', { total: data.length, item: item });
    });
  }).catch(function (err) {
    return _server2.default.emit('receive:tweets:error', err);
  });
});

exports.default = router;