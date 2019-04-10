const express = require('express')
const router = express.Router()
const control = require('../controllers/index.js')

router.post('/', control.create)
router.get('/', control.readAll)
router.get('/:id', control.read)
router.patch('/:id', control.edit)
router.delete('/:id', control.remove)

module.exports = router
