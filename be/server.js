import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import connection from './db/init.js'
import hotelRoutes from './routes/hotel.routes.js'
const app = express()
connection.connect((err) => {
  if (err) throw err
  console.log('Connected!')
})

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
)
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/hotels', hotelRoutes)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
