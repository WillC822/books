var sequelize = new Sequelize('books', 'root', '123', {
  host: 'localhost',
  dialect: 'mysql'

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});
