const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

User.hasMany(Book, { as: 'books', foreignKey: 'userId' });
Book.belongsTo(User, { foreignKey: 'userId' });

module.exports = Book;
