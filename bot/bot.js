const { authAPI } = require('./cmd.auth')
const config = require('./api.config')
const Twitter = require('twitter')

const client = new Twitter(config)

client.get('statuses/user_timeline.json', { screen_name: 'valinegeneve' }, (err, tweets, res) => {
  tweets.forEach(tweet => console.log(tweet.text))
})
