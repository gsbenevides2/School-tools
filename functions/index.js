const functions = require('firebase-functions');
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const routes = require('./src/routes')
 /*
mongoose.connect(
`mongodb://gsbenevides2:${process.env.DB_PASSWORD}@cluster0-shard-00-00-grlln.gcp.mongodb.net:27017,cluster0-shard-00-01-grlln.gcp.mongodb.net:27017,cluster0-shard-00-02-grlln.gcp.mongodb.net:27017/schoolTools?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 useFindAndModify: false,
 useCreateIndex: true,
})
*/
const app = express()
app.use(express.json())
app.use(routes)


exports.v1 = functions.https.onRequest(app)
