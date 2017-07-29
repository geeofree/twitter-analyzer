'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var NODE_ENV = process.env.NODE_ENV;

var APIConfig = {};

if (NODE_ENV === 'production') {
  var _process$env = process.env,
      CONSUMER_KEY = _process$env.CONSUMER_KEY,
      CONSUMER_SECRET = _process$env.CONSUMER_SECRET,
      ACCESS_TOKEN_KEY = _process$env.ACCESS_TOKEN_KEY,
      ACCESS_TOKEN_SECRET = _process$env.ACCESS_TOKEN_SECRET;

  APIConfig.consumer_key = CONSUMER_KEY;
  APIConfig.consumer_secret = CONSUMER_SECRET;
  APIConfig.access_token_key = ACCESS_TOKEN_KEY;
  APIConfig.access_token_secret = ACCESS_TOKEN_SECRET;
} else if (NODE_ENV === 'development') {
  var API = require('./config.dev');
  APIConfig.consumer_key = API.CONSUMER_KEY;
  APIConfig.consumer_secret = API.CONSUMER_SECRET;
  APIConfig.access_token_key = API.ACCESS_TOKEN_KEY;
  APIConfig.access_token_secret = API.ACCESS_TOKEN_SECRET;
}

exports.default = APIConfig;