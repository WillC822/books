const Book = require('../../models/book')

module.exports = (express) => {
  const router = express.Router()

  // get all the books in the collection
  router.get('/books', (req, res) => {

    Book.retrieveAll((books) => {
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

  // add a book to the collection
  router.post('/books', (req, res) => {

    Book.create({
      title: req.body.title,
      author: req.body.author,
      language: req.body.language,
      published_year: req.body.year,
      ISBN: req.body.ISBN
    }, () => {
      res.json({ message: 'Added book to collection'})
    })
  })

  // get a single book's information by its ID
  router.get('/books/:book_id', (req, res) => {

    Book.retrieveById(req.params.book_id, (books) => {
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
  router.put('/books/:book_id', (req, res) => {
    // use form data to update book data at the id passed in the URL
    Book.update({
      title: req.body.title,
      author: req.body.author,
      language: req.body.language,
      published_year: req.body.year,
      ISBN: req.body.ISBN
    }, { where: { book_id: req.params.book_id }}, () => {
      res.json({ message: "Book updated"})
    }, (error) => {
      res.send("Unable to update that book")
    })
  })

  // delete a single book by it's ID
  router.delete('/books/:book_id', (req, res) => {

    Book.removeById(req.params.book_id, (books) => {
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

  // select a book, and then find all other books that match that author
  router.get('/books/:book_id/author', (req, res) => {

    Book.retrieveById(req.params.book_id, (books) => {
      if(books) {
        // after getting the selected books information, match that books author with others in the database
        Book.findMatches({
          where: { author: books.author }
        }, (matches) => {
          // only display results if there is at least one match
          if(matches.length > 1) {
            res.json(matches)
          }
          else {
            res.send(401, "Couldn't find any additional books by that author")
          }
        }, (error) => {
          res.send(500, "Unable to execute searching query")
        })
      }
      else {
        res.send(401, "Couldn't find any books by that author")
      }
    }, (error) => {
      res.send(500, "Unable to execute retrieving book by ID")
    })
  })

  // select a book, and then find all other copies of that book regardless of language
  router.get('/books/:book_id/language', (req, res) => {

    Book.retrieveById(req.params.book_id, (books) => {
      if(books) {
        // after getting the selected books information, match that books ISBN with others in the database
        Book.findMatches({
          where: { ISBN: books.ISBN }
        }, (matches) => {
          // only display results if there is at least one match
          if(matches.length > 0) {
            res.json(matches)
          }
          else {
            res.send(401, "Couldn't find any matches for that book")
          }
        }, (error) => {
          res.send(500, "Unable to execute searching query")
        })
      }
      else {
        res.send(401, "Couldn't find any matches for that book")
      }
    }, (error) => {
      res.send(500, "Unable to execute retrieving book by ID")
    })
  })

  // search all authors by name
  router.get('/author/:name', (req, res) => {
    const selectedAuthor = req.params.name

    Book.findMatches({
      where: { author: selectedAuthor }
    }, (matches) => {
        if(matches.length > 0) {
          res.json(matches)
        }
        else {
          res.send(401, "Couldn't find any books by that author")
        }
    }, (error) => {
      res.send(500, "Unable to execute search")
    })
  })

  return router
}
