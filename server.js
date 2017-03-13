// Get dependencies
const express = require('express')
const path = require('path')
const http = require('http')
const bodyParser = require('body-parser')
const samarthyaPlatform = require('samarthyaPlatform')
const morgan = require('morgan')

// Get our API routes

// const api = require('./server/routes/api');
// const email = require('./server/routes/emailServer');

// const menuApi = require('./server/routes/menuApi');
const app = express()
app.use(morgan('dev'))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token')
  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200)
  }
  else {
    next()
  }
})

// Parsers for POST data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')))

// Set our api routes
app.use('/api', samarthyaPlatform.candidateAuthenticationRoutes)
app.use('/email', samarthyaPlatform.candidateEmailRoutes)

// app.use('/menuapi', menuApi);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

/**
 * Get port from environment and store in Express.
 */
app.use('/', function (req, res) {
  res.send('working')
})
const port = process.env.PORT || '3000'
app.set('port', port)

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log(`API running on localhost:${port}`))
