const pool = require('../../config/database');

module.exports = {
  createUser: (data, callBack) => {
    pool.query(
      `insert into registration(firstName, lastName, username, password)
                   values(?, ?, ?, ?)`,
      [data.first_name, data.last_name, data.username, data.password],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(`select id, firstName, lastName from registration`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getUserById: (id, callBack) => {
    pool.query(`select id, firstName, lastName from registration where id = ?`, [id], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update registration set firstName = ?, lastName = ?, username = ?, password = ? where id = ?`,
      [data.first_name, data.last_name, data.username, data.password, data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(`delete from registration where id = ?`, [data.id], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
  getUserByUserName: (username, callBack) => {
    pool.query(`select * from registration where username = ?`, [username], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  }
};
