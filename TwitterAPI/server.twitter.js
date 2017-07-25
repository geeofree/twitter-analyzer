import express from 'express'
import http from 'http'
import apiRoutes from './routes/routes.api'
import socketIO from 'socket.io'

const app = express()
const server = http.Server(app)
const io = socketIO(server)
const ENDPOINT = '/api/v1.0'
const PORT = 8080

app.use(ENDPOINT, apiRoutes)

app.use(express.static('dist'))

app.get('/', (req, res) => res.sendFile('index.html'))

io.on('connection', (socket) => console.log('user connected'))

server.listen(PORT, () => console.log(`Listening to LOCALHOST:${PORT}`))

export default io
