module.exports = function(sequelize, DataTypes) {
  var data = sequelize.define('data', {
    book_id: {type: Sequelize.BOOLEAN, allowNull: true defaultValue: true},

    title: { type: Sequelize.STRING, allowNull: false},

    author: { type: Sequelize.STRING, allowNull: true},

    language: { type: Sequelize.STRING, allowNull: true},

    published_date:type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: true},

    ISBN:
  })

}
