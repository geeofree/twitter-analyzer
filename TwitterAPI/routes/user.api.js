import express from 'express'
const router = express.Router()

import TwitterInterface from '../interface.twitter'
import APIConfig from '../config.twitter'
const API = TwitterInterface(APIConfig)

router.get('/:twitter_handle', (req, res) => {
  API.getUserTweets(req.params.twitter_handle).then(data => res.json(data))
})


export default router
