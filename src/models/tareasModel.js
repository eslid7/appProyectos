const db = require('../../database/dbConfig');
const Sequelize = require('sequelize');

const rModel = require('./recursosModel');
const pModel = require('./proyectosModel');
const cModel = require('./categoriasModel');


const tModel = db.define('tareas',{
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  id_recursos: {
    type: Sequelize.INTEGER,
    references: {
      // This is a reference to another model
      model: rModel,
      // This is the column name of the referenced model
      key: 'id_recursos',
      // This declares when to check the foreign key constraint. PostgreSQL only.
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
  },
  id_categoria: {
    type: Sequelize.INTEGER,
    references: {
      // This is a reference to another model
      model: cModel,
      // This is the column name of the referenced model
      key: 'id_categoria',
      // This declares when to check the foreign key constraint. PostgreSQL only.
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
  },
  id_proyectos: {
    type: Sequelize.INTEGER,
    references: {
      // This is a reference to another model
      model: pModel,
      // This is the column name of the referenced model
      key: 'id_proyectos',
      // This declares when to check the foreign key constraint. PostgreSQL only.
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
  },
  nombre:Sequelize.TEXT,
  horas:Sequelize.FLOAT(4)
});

module.exports=tModel;
