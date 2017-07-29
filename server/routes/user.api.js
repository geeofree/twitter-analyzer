import express from 'express'
import io from '../server'

import TwitterInterface from '../twitter/interface.twitter'
import APIConfig from '../twitter/config.twitter'

const router = express.Router()
const API = TwitterInterface(APIConfig)

router.get('/:twitterHandle', (req, res) => {
  const { twitterHandle } = req.params

  console.log('called')

  API.getUserTweets(twitterHandle)
  .then(data => data.forEach(item => io.emit('receive:tweets', { total: data.length, item })))
  .catch(err => io.emit('receive:tweets:error', err))
})


export default router
