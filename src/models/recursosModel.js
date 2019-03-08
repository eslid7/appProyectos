const db = require('../../database/dbConfig');
const Sequelize = require('sequelize');

const rModel = db.define('recursos',{
  id_recursos: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  nombre:Sequelize.TEXT,
  porhora:Sequelize.FLOAT(4)
});

module.exports=rModel;
