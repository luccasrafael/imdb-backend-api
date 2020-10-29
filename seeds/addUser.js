
const bcrypt = require('bcrypt-nodejs')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
      }
      userPassword = encryptPassword(1234)
      return knex('users').insert([
        { id: 1, name: 'Admin', email: 'admin@admin.com', name: 'Admin', password: userPassword, admin: true  }
      ]);
    });
};
