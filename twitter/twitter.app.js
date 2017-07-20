const Twitter = require('twitter')

class TwitterApp {
  constructor(apiConfig) {
    this._twitter = new Twitter(apiConfig)
  }

  getUserTweets(screen_name) {
    return new Promise((resolve, reject) => {
      const params = { screen_name, count: 200, include_rts: false, exclude_replies: true }
      const endpoint = 'statuses/user_timeline.json'
      const posts = []

      const getTweets = (id=true, counter=0) => {
        if(typeof id === 'number') params.max_id = id
        if(!id || counter >= 1000) { resolve(posts); return; }
        if(!id && counter === 0) { reject({ status: 'Empty', data: 'none' }); return; }

        this._twitter.get(endpoint, params, (err, data) => {
          const last_id = data[data.length - 1].id
          const data_sum = counter + data.length

          posts.push(...data)
          getTweets(last_id, data_sum)
        })
      }

      getTweets()
    })
  }
}

module.exports = TwitterApp
