const dummyData = require('./dummy.json')
function get(request, response) {
  const drillDown = makeResDataBy(request.query)
  return response.json({
    http_status: 200,
    success: true,
    drillDown
  })
}
function makeResDataBy(params) {
  const res = {
    option2: null,
    option3: null
  }
  const reqKeys = Object.keys(params)
  const resKeys = Object.keys(res)
  const reqLength = Object.keys(params).length
  const reqKey = reqKeys[reqLength - 1]
  const resKey = resKeys[reqLength - 1]
  const reqValue = params[reqKey]
  res[resKey] = dummyData[reqValue]

  return res
}
module.exports = get
