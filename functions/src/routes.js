const {Router} = require('express')

const AulaV1Controller = require('./controllers/v1/aula')
const AtividadeV1Controller = require('./controllers/v1/atividade')
const AuthV1Controller = require('./controllers/v1/auth')

const routes = Router()

routes.get('/aula',AulaV1Controller.index)
routes.post('/aula',AulaV1Controller.store)
routes.put('/aula',AulaV1Controller.update)
routes.delete('/aula',AulaV1Controller.delete)

routes.get('/auth',AuthV1Controller.index)

routes.get('/atividade',AtividadeV1Controller.index)
routes.post('/atividade',AtividadeV1Controller.store)
routes.put('/atividade',AtividadeV1Controller.update)
routes.delete('/atividade',AtividadeV1Controller.delete)

module.exports = routes
