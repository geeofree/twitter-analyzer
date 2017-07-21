import express from 'express'
const router = express.Router()

import TwitterInterface from '../interface.twitter'
import APIConfig from '../config.twitter'
const API = TwitterInterface(APIConfig)

router.get('/:twitterHandle', (req, res) => {
  const { twitterHandle } = req.params

  API.getUserTweets(twitterHandle)
  .then(data => res.json(data))
  .catch(err => res.json(err))
})


export default router
