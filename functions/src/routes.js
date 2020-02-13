const {Router} = require('express')

const AulaController = require('./controllers/aula')
const AuthController = require('./controllers/auth')

const routes = Router()

routes.get('/aula',AulaController.index)
routes.post('/aula',AulaController.store)
routes.put('/aula',AulaController.update)
routes.delete('/aula',AulaController.delete)

routes.get('/auth',AuthController.index)
module.exports = routes
