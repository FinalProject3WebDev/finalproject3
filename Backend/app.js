// import dari node_module
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000
const router = require('./routers')

app
   .use(express.json())
   .use(express.urlencoded({ extended: false }))
   .use(cors())
   // .use(bodyParser.json())

app.use(router);

app.listen(PORT, () => {
   console.log(`Server is running on port: http://localhost:${PORT}`)
})