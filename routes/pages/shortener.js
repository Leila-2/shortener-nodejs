const { Router } = require('express')
const router = new Router()
const ctrl = require('../../controllers')

router.get('/', ctrl.getAll)

module.exports = router