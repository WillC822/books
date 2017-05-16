const Book = require('../models/database')

module.exports = (express) => {
  const router = express.Router()

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

  router.route('/books/:book_id/author')
    // select a book, and then find all other books that match that author
    .get((req, res) => {
      const selectedBook = Book.build()

      selectedBook.retrieveById(req.params.book_id, (books) => {
        if(books) {
          let matchingAuthors = Book.findAll({
            where: { author: books.author }
          }).then((matches) => {
            if(matches) {
              res.json(matches)
            }
            else {
              res.send(401, "Couldn't find any books by that author")
            }
          })
        }
        else {
          res.send(401, "Couldn't find any books by that author")
        }
      }, (error) => {
        res.send("Couldn't find any books by that author")
      })
    })

    router.route('/books/:book_id/language')
      // select a book, and then find all other copies of that book regardless of language
      .get((req, res) => {
        const selectedBook = Book.build()

        selectedBook.retrieveById(req.params.book_id, (books) => {
          if(books) {
            let matchingBooks = Book.findAll({
              where: { ISBN: books.ISBN }
            }).then((matches) => {
              if(matches) {
                res.json(matches)
              }
              else {
                res.send(401, "Couldn't find any matches for that book")
              }
            })
          }
          else {
            res.send(401, "Couldn't find any matches for that book")
          }
        }, (error) => {
          res.send("Couldn't find any matches for that book")
        })
      })

  router.route('/author/:name')
    // select a book, and then find all other books that match that author
    .get((req, res) => {
      const selectedAuthor = req.params.name

      Book.findAll({ where: { author: selectedAuthor }})
        .then((matches) => {
          if(matches.length > 1) {
            res.json(matches)
          }
          else {
            res.send(401, "Couldn't find any books by that author")
          }
      }).catch((error) => {
        res.send(500, "Unable to execute search")
      })
    })

  router.use("/api", router)

  return router
}
