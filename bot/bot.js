const { authAPI }    = require('./cmd.auth')
const { TwitterApp } = require('./twitter.app')

const config = require('../api.config')
const client = new TwitterApp(config)

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
}

client.getWordCount('valinegeneve', (words) => {
  words.forEach(({ word, count }) => {
    const avg_percent = (count / words.length) * 100
    console.log(word, avg_percent)
  })
})
