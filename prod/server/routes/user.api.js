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


  API.getUserTweets(twitterHandle, function (api_response) {
    if (api_response.status === 201) {
      api_response.data.forEach(function (data) {
        return _server2.default.emit('receive:tweets', {
          data: data,
          max_batch: api_response.max_batch,
          status: api_response.status
        });
      });
    } else if (api_response.status === 200) {
      _server2.default.emit('receive:tweets', { status: api_response.status });
    } else if (api_response.status >= 400) {
      _server2.default.emit('receive:tweets:error', api_response);
    }
  });
});

exports.default = router;