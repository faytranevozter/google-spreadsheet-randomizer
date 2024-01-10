const Router = require('koa-router')
const router = new Router()
const spreadsheetController = require('../controllers/spreadsheet.controller')

router.get('/random', spreadsheetController.randomDataGet)

module.exports = router
