import express from 'express'
const router = express.Router()

import UserRoute from './user.api'

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

router.use('/user', UserRoute)


export default router
