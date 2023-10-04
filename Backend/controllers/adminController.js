const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  

//   async createUser(req, res) {
//     try {
//       const newUser = await User.create(req.body);
//       res.status(201).json(newUser);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   },
  
  async createUser(req, res) {
    const { name, email, password, address } = req.body;
  
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to hash password' });
      }
  
      User.create({
        name,
        email,
        password: hashedPassword,
        address,
      })
        .then((user) => {
          // Berhasil menambahkan pengguna baru
          res.status(201).json({ message: 'User added successfully', user });
        })
        .catch((error) => {
          // Gagal menambahkan pengguna baru
          res.status(500).json({ message: 'Failed to add user', error });
        });
    });
  },

  async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateUser(req, res) {
    const userId = req.params.id;
    try {
      const [updatedRowsCount, updatedRows] = await User.update(req.body, {
        where: { id: userId },
        returning: true,
      });

      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(updatedRows[0]);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteUser(req, res) {
    const userId = req.params.id;
    try {
      const deletedRowCount = await User.destroy({ where: { id: userId } });

      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
