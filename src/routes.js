const express = require('express') // importando o express que é um framework para criar o servidor
const routes = express.Router() // criando uma instância do express pelo router, que é um módulo do express
const ProfileController = require('./controllers/ProfileController') // importando o controller
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

// O ejs por padrão já reconhece as views, então não precisa configurar nada
// Mas, funciona apenas caso a views esteja na raiz do projeto

// redirect => redirecionar
// sendFile => enviar arquivo
// render => renderizar
// json => retornar um json
// status => retornar um status

// function remainingDays(job) {
//   const { dailyHours, totalHours } = job
//   const days = totalHours / dailyHours
//   return days
// }

// routes.get('/', () => print('Hello World!'))
routes.get('/index.html', (req, res) => res.redirect('/'))

routes.get('/', DashboardController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes
