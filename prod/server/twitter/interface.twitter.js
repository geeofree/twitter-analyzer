'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _twitter2 = require('twitter');

var _twitter3 = _interopRequireDefault(_twitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (APIConfig) {
  var _twitter = new _twitter3.default(APIConfig);

  var getUserTweets = function getUserTweets(twitterHandle) {
    return new Promise(function (resolve, reject) {
      var endpoint = 'statuses/user_timeline.json';
      var params = { screen_name: twitterHandle, count: 200, include_rts: false };
      var posts = [];

      var getData = function getData(err, tweets) {
        if (err) {
          reject({ status: 404, status_message: 'Data not found.' });return;
        }

        if (posts.length === 0 && tweets.length === 0) {
          reject({ status: 404, status_message: 'Data not found.' });
          return;
        } else if (tweets.length === 0) {
          resolve(posts);return;
        }

        var max_data = 1000;
        var lastItem = tweets[tweets.length - 1];
        var limit = lastItem.user.status_count < max_data ? lastItem.user.status_count : max_data;

        if (params.max_id && params.max_id === lastItem.id) {
          resolve(posts);return;
        }
        params.max_id = lastItem.id;

        if (posts.length + tweets.length < limit) {
          posts.push.apply(posts, _toConsumableArray(tweets));
        } else {
          posts.push.apply(posts, _toConsumableArray(tweets.filter(function (_, index) {
            return index < limit - posts.length;
          })));
        }

        if (posts.length < limit) {
          _twitter.get(endpoint, params, getData);
          return;
        }

        resolve(posts);
      };

      _twitter.get(endpoint, params, getData);
    });
  };

  return { getUserTweets: getUserTweets };
};