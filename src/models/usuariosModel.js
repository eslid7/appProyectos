const db = require('../../database/dbConfig');
const Sequelize = require('sequelize');

const uModel = db.define('usuarios',{
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  firstname: {
    type: Sequelize.STRING,
  },
  lastname: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING
  },
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  roll: { type: Sequelize.INTEGER}
},
{
    timestamps: false
});

module.exports=uModel;
