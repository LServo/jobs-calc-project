/* -------------------------------------------------------------- */

const print = text => console.log(text)
const $ = element => document.querySelector(element)
const lucas = 'lucas'
/* -------------------------------------------------------------- */

const express = require('express')
const server = express()
const routes = require('./routes')
const path = require('path')

// Usando template engineMeu Perfil
server.set('view engine', 'ejs') // está dizendo ao ejs que todo o front vai estar em uma pasta chamada views
// ou seja, por padrão, tudo que tem na views é ejs

// mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

// habilitar métodos estáticos
// o use() não serve para criar rotas sempre, mas sim para adicionar configurações no servidor
// o caminho estático passado não fará parte do caminho da rota, porque ele não importa, ele é apenas um caminho. só importa o que está dentro
server.use(express.static('public')) // middleware, do something with the request

// usar o req.body
server.use(express.urlencoded({ extended: true }))
// estamos pedindo que haja uma extensão na codificação dos dados, desta forma o express entende que os dados estão em formato json e habilita o body

// routes
server.use(routes)

server.listen(3000, () => print(`Server of ${lucas} is running on port 3000`)) // servidor está ouvindo a porta 3000
