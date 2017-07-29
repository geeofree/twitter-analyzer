process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const { NODE_ENV } = process.env
const APIConfig = { }


if(NODE_ENV === 'production') {
  const { CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET } = process.env
  APIConfig.consumer_key = CONSUMER_KEY
  APIConfig.consumer_secret = CONSUMER_SECRET
  APIConfig.access_token_key = ACCESS_TOKEN_KEY
  APIConfig.access_token_secret = ACCESS_TOKEN_SECRET
}
else if(NODE_ENV === 'development') {
  const API = require('./config.dev')
  APIConfig.consumer_key = API.CONSUMER_KEY
  APIConfig.consumer_secret = API.CONSUMER_SECRET
  APIConfig.access_token_key = API.ACCESS_TOKEN_KEY
  APIConfig.access_token_secret = API.ACCESS_TOKEN_SECRET
}

export default APIConfig
