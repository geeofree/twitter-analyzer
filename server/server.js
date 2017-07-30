import express from 'express'
import http from 'http'
import https from 'https'
import apiRoutes from './routes/routes.api'
import socketIO from 'socket.io'

const app = express()
const server = process.env.NODE_ENV === 'development' ? http.Server(app) : https.Server(app)
const io = socketIO(server)
const ENDPOINT = '/api/v1.0'
const PORT = process.env.PORT || 8080

app.use(ENDPOINT, apiRoutes)

app.use(express.static('dist'))

app.get('/', (req, res) => res.sendFile('index.html'))

server.listen(PORT, () => console.log(`Listening to LOCALHOST:${PORT}`))

export default io
