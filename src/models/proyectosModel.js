const db = require('../../database/dbConfig');
const Sequelize = require('sequelize');

const pModel = db.define('proyectos',{
  id_proyectos: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  nombre:Sequelize.TEXT
});

module.exports=pModel;
