const { User } = require('../models');
const { comparePassword } = require('../helpers/password');
const { generateToken } = require('../helpers/jwt');
const { Op } = require('sequelize')
const bcrypt = require('bcrypt');
const user = require('../models/user');

class UserController {
    static async register(req, res) {
        const { name, email, password, role = 'member', address } = req.body;
    
        try {
            // Check if email or name is already in use
            const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email }, { name }],
            },
            });
        
            if (existingUser) {
            return res.status(400).send('Email or name is already in use.');
            }
    
            // Hash the password 
            const hashedPassword = bcrypt.hashSync(password, 10);
        
            // Create user with the hashed password
            await User.create({ name, email, password: hashedPassword, role, address });
        
            return res.status(201).send(`Successfully registered, name: ${name}`);
            console.log("user",user)
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error')
        }
    }

    static login (req, res) {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send("Email dan password kosong")
         }
         User.findOne({ where: { email: email } })
            .then((foundUser) => {
               console.log(foundUser)
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
                  name: foundUser.name,
                  id: foundUser.id,
                  role: foundUser.role
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
    }

    static getUserProfile(req, res) {
         const { id } = res.locals.user;
         User.findByPk(id)
               .then(foundUser => {
                  if (!foundUser) {
                     return res.status(404).json({ message: 'User not found' });
                  }

                  res.status(200).json({ message: 'User found', user: foundUser });
               })
               .catch(error => {
                  console.error(error);
                  res.status(500).json({ message: 'Failed to find user' });
               });
    }

    static async editProfile(req, res) {
      const { id } = res.locals.user;
      const { name, email, address, phoneNumber } = req.body;
    
      try {
        const user = await User.findByPk(id);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        if (name) {
          user.name = name;
        }
        if (email) {
          user.email = email;
        }
        if (address) {
          user.address = address;
        }
        if (phoneNumber) {
          user.phoneNumber = phoneNumber;
        }
    
        await user.save();
    
        res.status(200).json({ message: 'User profile updated successfully', user: user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update user profile' });
      }
    }
}

module.exports = UserController;