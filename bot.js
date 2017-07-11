const { authAPI } = require('./cmd.auth')
const Twitter = require('twitter')

authAPI(res => {
  const client = new Twitter(res)
  console.log(client)
})
