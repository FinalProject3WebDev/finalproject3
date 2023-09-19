// import dari node_module
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//import secara local
const models = require('./models')

// Import the jwt.js module
const { comparePassword } = require('./helpers/password')
const { generateToken, verifyToken } = require('./helpers/jwt')
const { Op } = require('sequelize')

const app = express()
const PORT = 3000

app
   .use(express.json())
   .use(cors())
   .use(bodyParser.json())
   .post('/register', async (req, res) => {
      const { name,email, password } = req.body;
      const { User } = models;
    
      // Check if email or username is already in use
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email }, { name }]
        }
      });
   //  console.log(existingUser)
      if (existingUser) {
        return res.status(400).send('Email or username is already in use.')
      //   console.log('user :',existingUser)
      }
      // Create the user if email and username are not in use
      User.create({ name, email, password })
        .then(() => {
          return res.status(201).send(`Successfully registered, name: ${name}`)
        })
    })
   
   .post('/login', (req, res) => {
      const { email, password } = req.body
      const { User } = models

      if (!email || !password) {
         return res.status(400).send("Email dan password kosong")
      }
      User.findOne({ where: { email: email } })
         .then((foundUser) => {
            // console.log(foundUser)
            if (!foundUser) {
               return res.status(401).json({ error: "Unauthorized", message: "Invalid email" })
            }
            // console.log("test")
            const isMatches = comparePassword(password, foundUser.password)

            if (!isMatches) {
               return res.status(401).json({ error: "Unauthorized", message: "Invalid email/password" })
            }
            const responsePayload = {
               email: foundUser.email,
               role: foundUser.role,
               id: foundUser.id
            }
            // encode sebagai jwt 
            const token = generateToken(responsePayload)
            // mengirim respons kembali ke client
            const responseData = {
               accessToken: token,
               email: responsePayload.email,
               role: responsePayload.role,
               id: responsePayload.id
            };
            res.status(200).json(responseData)
         })
         .catch(e => {
            console.log(e)
            res.status(500).json({ error: "Internal Server Error", message: e.message })
         })
   })

   .get('/profile',
      //middleware
      (req, res, next) => {

         try {
            const token = req.get('token')
            const payload = verifyToken(token)

            const { Users } = models

            Users.findOne({ where: { name: payload.name } })
               .then(foundUser => {
                  if (!foundUser) return res.status(401).send("User does not exits")

                  res.locals.user = foundUser

                  return next()
               })
            console.log(payload)
         } catch (e) {
            return res.status(401).send("Error when validation token")
         }
      },
      (req, res) => {
         const { id, name, username, email, password, role, address, phonenumber } = res.locals.user

         return res.status(200).send({ id, name, username, email, password, role, address, phonenumber })
      }
   )

  

app.listen(PORT, () => {
   console.log(`Aplikasi meluncur di sini ya: http://localhost:${PORT}`)
})