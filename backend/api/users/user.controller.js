const { createUser, getUserById, getUsers, updateUser, deleteUser, getUserByUserName } = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const router = require('express').Router();
router.post('/');

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          succes: 0,
          message: 'Database connection error'
        });
      }
      return res.status(200).json({
        succes: 1,
        data: results
      });
    });
  },
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          succes: 0,
          message: 'Database connection error'
        });
      }
      if (!results) {
        return res.status(404).json({
          succes: 0,
          message: 'Record not found'
        });
      }
      return res.status(200).json({
        succes: 1,
        data: results
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          succes: 0,
          message: 'Database connection error'
        });
      }
      return res.status(200).json({
        succes: 1,
        data: results
      });
    });
  },
  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          succes: 0,
          message: 'Database connection error'
        });
      }
      if (!results) {
        return res.status(404).json({
          succes: 0,
          message: 'Failed to update user'
        });
      }
      return res.status(200).json({
        succes: 1,
        data: results
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          succes: 0,
          message: 'Database connection error'
        });
      }
      if (!results) {
        return res.status(404).json({
          succes: 0,
          message: 'Record not found'
        });
      }
      return res.status(200).json({
        succes: 1,
        message: 'User is deleted succesfully'
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    let user = { username: 'asd', password: hashSync('asd1', salt) };
    let result = false;
    result = compareSync(body.password, user.password);
    if (result && body.username === user.username) {
      return res.json({ succes: 1, message: 'login succesfully' });
    } else {
      return res.json({
        succes: 0,
        message: 'Invalid username or password'
      });
    } /*
    getUserByUserName(body.username, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          succes: 0,
          message: 'Database connection error'
        });
      }
      if (!results) {
        return res.status(404).json({
          succes: 0,
          message: 'Invalid username or password'
        });
      }
      let result = false;
      if (results[0] && results[0].password) result = compareSync(body.password, results[0].password);
      if (result) {
        results[0].password = undefined;
        const jsontoken = sign({ result: results }, 'qwe1234', { expiresIn: '1h' });
        return res.json({ succes: 1, message: 'login succesfully', token: jsontoken });
      } else {
        return res.json({
          succes: 0,
          message: 'Invalid username or password'
        });
      }
    });*/
  }
};
