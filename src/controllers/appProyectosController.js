const controller = {};
const sequelize = require('../../database/dbConfig');

const tModel = require('../models/tareasModel');



controller.list = (req, res) => {
    //Se utiliza model de Sequelize
tModel.findAll()
  .then(tareas => {
    console.log(tareas);
    //res.send(tareas[1].nombre)
    res.render('index', {
      data: tareas
    })
  })
  .catch(err => console.log(err));
};

controller.insert = (req, res) => {
  const nombre = req.body.nombre;
  const horas = req.body.horas;
  const query = 'INSERT INTO tareas (id_recursos, id_proyectos, nombre, horas) VALUES (1,1,'+"'"+nombre+"',"+horas+')';
  sequelize.query(query).spread((results, metadata) => {
  res.redirect('/');
})

};

controller.save = (req, res) => {
  res.render('tareas_edit');
};


controller.edit = (req, res) => {
  const  idE  = req.params.id;
  tModel.findAll(
    {
  where: {
    id: idE
  }
}
  )
    .then(tareas => {
      console.log(tareas);
      //res.send(tareas[0].nombre)
      res.render('tareas_edit', {
        data: tareas
      })
    })
    .catch(err => console.log(err));

};

controller.updateT = (req, res) => {
  const  idT  = req.params.id;
  const nombre = req.body.nombre;
  const horas =  req.body.horas;
  const query = 'UPDATE tareas set nombre='+"'"+ nombre +"'"+', horas=' + horas +' where id =' + idT;

  //res.send(nombre);
  sequelize.query(query).spread((results, metadata) => {
    res.redirect('/');
  });
};

controller.delete = (req, res) => {
  const  id  = req.params.id;
    const query = 'DELETE FROM tareas WHERE id = '+id;
    sequelize.query(query).spread((results, metadata) => {
      res.redirect('/');
    });
};
/*
controller.report = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM customer', (err, customers) => {
     if (err) {
      res.json(err);
     }
    // res.send('works');
    var pdf = require('html-pdf');

var contenido1 = `
<h1>EstE es el Reporte en PDF</h1>
<table class="table table-bordered table-hover">
  <thead>
    <tr>
      <td>n°</td>
      <td>Name</td>
      <td>Address</td>
      <td>Phone</td>
    </tr>
  </thead>
  <tbody>`;
var td= `<td>`
var td2= `</td>`
var tr= `<tr>`
var tr2= `</tr>`
var tbody = ``
   if (customers) {
      for(var i = 0; i < customers.length; i++) {
        var indice= (i + 1);
        var name = customers[i].name
        var address = customers[i].address
        var phone = customers[i].phone

        var tbody = tbody + tr + td +indice+td2+td+name+td2+td+address+td2+td+phone+td2+tr;
      }
    }
var contenido3 = `  </tbody>
</table>`;
var contenido = contenido1 + tbody + + contenido3
pdf.create(contenido).toFile('./salida.pdf', function(err, res) {
    if (err){
        console.log(err);
    } else {
        console.log(res);
    }
});
    //res.redirect('/');
    res.send(contenido);
    });
  });
};
*/
module.exports = controller;
