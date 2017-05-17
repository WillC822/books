const db = require('./database')

exports.retrieveAll = (onSuccess, onError) => {
  db.Book.findAll({})
    .then(onSuccess)
    .error(onError)
}

exports.retrieveById = (book_id, onSuccess, onError) => {
  db.Book.find({where: { book_id: book_id }})
  .then(onSuccess)
  .error(onError)
}

exports.removeById = (book_id, onSuccess, onError) => {
  db.Book.destroy({ where: { book_id: book_id }})
  .then(onSuccess)
  .error(onError)
}

exports.create = (information, onSuccess, onError) => {
  db.Book.create(information)
  .then(onSuccess)
  .error(onError)
}

exports.update = (information, target, onSuccess, onError) => {
  db.Book.update(information, target)
  .then(onSuccess)
  .error(onError);
}

exports.findMatches = (query, onSuccess, onError) => {
  db.Book.findAll(query)
  .then(onSuccess)
  .error(onError)
}
