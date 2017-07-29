'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _routes = require('./routes/routes.api');

var _routes2 = _interopRequireDefault(_routes);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.Server(app);
var io = (0, _socket2.default)(server);
var ENDPOINT = '/api/v1.0';
var PORT = process.env.PORT || 8080;

app.use(ENDPOINT, _routes2.default);

app.use(_express2.default.static('dist'));

app.get('/', function (req, res) {
  return res.sendFile('index.html');
});

server.listen(PORT, function () {
  return console.log('Listening to LOCALHOST:' + PORT);
});

exports.default = io;