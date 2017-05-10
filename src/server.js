const express = require('express');

const app = express();

app.get ('/', (req,res) =>{
  res.json({healthy: true})
});

router.get('/:id', function(req, res, next) {
  let dataId = req.params.id

  res.send(data[dataId])
})

router.post('/', function(req, res, next) {
  let newBook = {
    "title": req.body.title,
    "author": req.body.author,
    "language": req.body.language,
    "published": req.body.published,
    "ISBN": req.body.ISBN
  }

  data.push(newBook)
  res.redirect('/api')
})

router.put('/:id', function(req, res, next) {
  let dataId = req.params.id
  let updatedBook = {
    "title": req.body.title,
    "author": req.body.author,
    "language": req.body.language,
    "published": req.body.published,
    "ISBN": req.body.ISBN
  }

  data[dataId] = updatedBook
  res.send(data[dataId])
})

router.delete('/:id', function(req, res, next) {
  let dataId = req.params.id

  data.splice(dataId, 1)
  res.send(data)
})

app.use('/api', router)

app.listen(3000);
