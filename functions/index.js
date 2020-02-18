const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp()
const express = require('express')
require('dotenv').config()
const routes = require('./src/routes')
const app = express()
app.use(express.json())
app.use(routes)


exports.v1 = functions.https.onRequest(app)
