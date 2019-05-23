'use strict';

// let crypto = require('crypto')
let bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Wrong email format'
        }
      }
    },
    password: DataTypes.STRING,
    balance: DataTypes.INTEGER
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.UserGame, {
      foreignKey: 'UserId'
    })
  };

  User.addHook('beforeCreate', 'encryptPassword', (user, option) => {

    var salt = bcrypt.genSaltSync(10);
    user.password = `${user.password}`

    var hash = bcrypt.hashSync(user.password, salt);

    console.log("MASUK============================")
    user.password = hash;
  })

  return User;
};