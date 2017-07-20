import express from 'express'
import apiRoutes from './routes/api.routes'

const app = express()
const PORT = 8080

app.use('/api/v1.0', apiRoutes)

app.use(express.static('dist'))

app.get('/*', (req, res) => res.sendFile('index.html'))

app.listen(PORT, () => console.log(`Listening to LOCALHOST:${PORT}`))
