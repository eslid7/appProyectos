const db = require('../../database/dbConfig');
const Sequelize = require('sequelize');

const cModel = db.define('categorias',{
  id_categoria: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  nombre:Sequelize.TEXT,
  descripcion:Sequelize.TEXT
});

module.exports=cModel;
