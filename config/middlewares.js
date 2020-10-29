const bodyParser = require('body-parser')
const cors = require('cors') // Just in case is needed

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
}