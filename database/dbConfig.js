const Sequelize = require('sequelize');
const sequelize = new Sequelize('appproyectos', 'postgres', 'asp128', {
  dialect: 'postgres',
  define: {
        timestamps: false
    }
});


module.exports = sequelize;
