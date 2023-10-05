// import dari node_module
const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routers')

app.use('/images', express.static('images'));

app
   .use(express.json())
   .use(express.urlencoded({ extended: false }))
   // .use(bodyParser.json())

app.use(router);

app.listen(PORT, () => {
   console.log(`Server is running on port: http://localhost:${PORT}`)
})