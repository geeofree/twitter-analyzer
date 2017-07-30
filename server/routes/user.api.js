import express from 'express'
import io from '../server'

import TwitterInterface from '../twitter/interface.twitter'
import APIConfig from '../twitter/config.twitter'

const router = express.Router()
const API = TwitterInterface(APIConfig)

router.get('/:twitterHandle', (req, res) => {
  const { twitterHandle } = req.params

  API.getUserTweets(twitterHandle, api_response => {
    if(api_response.status === 201) {
      api_response.data.forEach(data => io.emit('receive:tweets', {
        data,
        max_batch: api_response.max_batch,
        status: api_response.status,
      }))
    }
    else if(api_response.status === 200) {
      io.emit('receive:tweets', { status: api_response.status })
    }
    else if(api_response.status >= 400) {
      io.emit('receive:tweets:error', api_response)
    }
  })
})


export default router
