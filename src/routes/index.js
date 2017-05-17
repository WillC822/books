const Book = require('../models/database')

module.exports = (express) => {
  const router = express.Router()  

  router.use("/api", require('./api/books')(express))

  return router
}
