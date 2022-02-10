const express = require('express')
const apiMocker = require('connect-api-mocker')
const app = express()

app.use('/api', apiMocker('mocks/api', '__mock__/api'))
app.listen(8080)

module.exports = {
  path: '/api',
  handler: app
}