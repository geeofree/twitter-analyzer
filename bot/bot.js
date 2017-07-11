const { authAPI }    = require('./cmd.auth')
const { TwitterApp } = require('./twitter.app')

const config = require('../api.config')
const client = new TwitterApp(config)

client.getUserStatus('GeeOFree', (err, tweets, response) => {
  const words = tweets.map(tweet => tweet.text.toLowerCase().split(/[\s,\W]/).filter(word => word.length > 2))
  console.log(words)
})
