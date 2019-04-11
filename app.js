const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))

const cars = require('./src/routes/index')
app.use('/cars', cars)

app.use((req, res, next) => next({ status: 404, message: { error: 'Not Found' } }))

app.use((err, req, res, next) => {
  console.error(err)
  const error = {}

  error.message = err || `Internal Server Error`
  error.status = err.status || 500
  error.stack = err.stack

  res.status(error.status).json(error)
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)

module.exports = app
