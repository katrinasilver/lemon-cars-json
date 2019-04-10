const express = require('express')
const app = express()
const morgan = require('morgan')
const port = process.env.PORT || 3000

app.use(express.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

const data = require('./src/routes/index')
app.use('/data', data)

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
