const Sequelize = require('sequelize');
/*const sequelize = new Sequelize('appproyectos', 'postgres', 'asp128', {
  dialect: 'postgres',
  define: {
        timestamps: false
    }
});
*/
const sequelize = new Sequelize('project_estima', 'dev_estima', 'B9QwK4vGY', {
  host: 'postgresqldev2.cfxwd2oauf8n.us-east-1.rds.amazonaws.com',
  dialect: 'postgres'
});

module.exports = sequelize;
