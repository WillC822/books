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

// make sure sequelize is running properly
sequelize.authenticate()
  .then((err) => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.log('ERROR', err)
  })

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
  tableName: 'book'
})

// You can use Sequelize's sync method here to make dealing with your table easier
// sequelize.sync()

exports.sequelize = sequelize
exports.Book = Book
