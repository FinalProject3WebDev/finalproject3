// import dari node_module
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

//import secara local
const models = require('./models')
// Import the jwt.js 
const { comparePassword } = require('./helpers/password')
const { generateToken, verifyToken } = require('./helpers/jwt')
const { Op } = require('sequelize')

const app = express()
const PORT = 3000
const router = require('./routers')

app
   .use(express.json())
   .use(cors())
   .use(bodyParser.json())

app.use(router);

app.listen(PORT, () => {
   console.log(`Server is running on port: http://localhost:${PORT}`)
})