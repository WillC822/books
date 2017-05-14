var sequelize = new Sequelize('books', 'root', '123', {
  host: 'localhost',
  dialect: 'mariadb'

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

// Or you can simply use a connection uri
var sequelize = new Sequelize('mariadb://root:root@localhost:5432/books');
