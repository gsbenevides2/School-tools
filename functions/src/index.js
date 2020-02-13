const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const routes = require('./routes')

mongoose.connect(
`mongodb://gsbenevides2:${process.env.DB_PASSWORD}@cluster0-shard-00-00-grlln.gcp.mongodb.net:27017,cluster0-shard-00-01-grlln.gcp.mongodb.net:27017,cluster0-shard-00-02-grlln.gcp.mongodb.net:27017/schoolTools?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 useFindAndModify: false,
 useCreateIndex: true,
})

const app = express()
app.use(express.json())
app.use(routes)

const port = process.env.PORT || 3000
app.listen(port,()=>{
	console.log('Servidor rodando na porta:',port)
})
