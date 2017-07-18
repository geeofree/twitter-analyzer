const Twitter = require('twitter')
const { wordCount } = require('../stat/stat')

class TwitterApp {
  constructor(apiConfig) {
    this._twitter = new Twitter(apiConfig)
  }

  _getUserStatus(screen_name, callback) {
    const params = { screen_name, count: 200, include_rts: false, exclude_replies: true }
    this._twitter.get('statuses/user_timeline.json', params, callback)
  }

  getWordCount(screen_name, callback) {
    this._getUserStatus(screen_name, (err, tweets, response) => {
      const posts = tweets.map(tweet => tweet.text.toLowerCase().split(/[\s,\W]|https?.+/).filter(txt => txt.length > 2))
      callback(wordCount(posts))
    })
  }
}

module.exports = { TwitterApp }
