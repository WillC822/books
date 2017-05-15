const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const Sequelize = require('sequelize')
const config = require('./database.json')
// create a new connection
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    port: config.port
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
      Book.find({where: { id: book_id }})
      .then(onSuccess)
      .error(onError)
    },
    removeById: (book_id, onSuccess, onError) => {
      Book.destroy({ where: { id: book_id }})
      .then(onSuccess)
      .error(onError)
    }
  }
})

router.route('/books')
  // add a book to the collection
  .post((req, res) => {
    const newBook = Book.create({
      title: req.body.title,
      author: req.body.author,
      language: req.body.language,
      published_year: req.body.year,
      ISBN: req.body.ISBN
    }).then(() => {
      res.json({ message: 'Added book to collection'})
    })
  })
  // get all the books in the collection
  .get((req, res) => {
    const collection = Book.build()

    collection.retrieveAll((books) => {
      if(books) {
        res.json(books)
      }
      else {
        res.send(401, "Couldn't find any books")
      }
    }, (error) => {
      res.send("Couldn't find any books")
    })
  })

router.route('/books/:book_id')
  // get a single book's information by its ID
  .get((req, res) => {
    const selectedBook = Book.build()

    selectedBook.retrieveById(req.params.book_id, (books) => {
      if(books) {
        res.json(books)
      }
      else {
        res.send(401, "Couldn't find that book")
      }
    }, (error) => {
      res.send("Couldn't find that book")
    })
  })
  // update a single book's information by its ID
  .put((req, res) => {
    // use form data to update book data at the id passed in the URL
    const updatedBook = Book.update({
      title: req.body.title,
      author: req.body.author,
      language: req.body.language,
      published_year: req.body.year,
      ISBN: req.body.ISBN
    }, { where: { id: req.params.book_id }})
      .then(() => {
        res.json({ message: "Book updated"})
      })
  })
  // delete a single book by it's ID
  .delete((req, res) => {
    const selectedBook = Book.build()

    selectedBook.removeById(req.params.book_id, (books) => {
      if(books) {
        res.json({ message: "Removed book from the collection"})
      }
      else {
        res.send(401, "Couldn't find that book")
      }
    }, (error) => {
      res.send("Couldn't find that book")
    })
  })

  app.use("/api", router)

  const server = app.listen(port, function () {
    console.log("Server running on Port: ", port);
  })

  module.exports = server