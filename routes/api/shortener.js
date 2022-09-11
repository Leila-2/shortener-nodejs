const { Router } = require('express')
const router = new Router()
const ctrl = require('../../controllers')
const { validateBody } = require('../../middlewares')
const { addSchema } = require('../../models/shortUrl')
const { controllerWrapper } = require('../../helpers')
router.get('/:shortUrl', controllerWrapper(ctrl.redirect))

router.post('/', validateBody(addSchema), controllerWrapper(ctrl.add))

module.exports = router