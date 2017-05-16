const Sequelize = require('sequelize')
require('dotenv').config()

// create a new connection
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    port: process.env.DATABASE_PORT,
    dialectOptions: {
      insecureAuth: true
    }
  }
)

//create a Model for a book object (Schema)
const Book = sequelize.define('book', {
  book_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  language: Sequelize.STRING,
  published_year: Sequelize.STRING,
  ISBN: Sequelize.STRING
}, {
  // don't use timestamps otherwise you'll have trouble with GET calls (created_at, updated_at)
  timestamps: false,
  // set the table name manually so you don't look for a plural table name
  tableName: 'book',
  instanceMethods: {
    retrieveAll: (onSuccess, onError) => {
      Book.findAll({})
        .then(onSuccess)
        .error(onError)
    },
    retrieveById: (book_id, onSuccess, onError) => {
      Book.find({where: { book_id: book_id }})
      .then(onSuccess)
      .error(onError)
    },
    removeById: (book_id, onSuccess, onError) => {
      Book.destroy({ where: { book_id: book_id }})
      .then(onSuccess)
      .error(onError)
    }
  }
})

// You can use Sequelize's sync method here to make dealing with your table easier
// sequelize.sync()

exports.sequelize = sequelize
exports.Book = Book
