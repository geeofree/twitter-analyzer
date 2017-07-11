const Twitter = require('twitter')

class TwitterApp {
  constructor(apiConfig) {
    this._twitter = new Twitter(apiConfig)
  }

  getUserStatus(screen_name, callback) {
    const params = { screen_name, count: 20, include_rts: false, exclude_replies: true }
    this._twitter.get('statuses/user_timeline.json', params, callback)
  }
}

module.exports = { TwitterApp }
