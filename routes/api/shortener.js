const { Router } = require('express')
const router = new Router()
const ctrl = require('../../controllers')

router.get('/', ctrl.getAll)
router.get('/:shortUrl', ctrl.getById)
router.post('/shortUrls', ctrl.add)

module.exports = router