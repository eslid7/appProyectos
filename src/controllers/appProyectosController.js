const controller = {};
const sequelize = require('../../database/dbConfig');

const tModel = require('../models/tareasModel');



controller.list = (req, res) => {

  /*  sequelize.query("SELECT * FROM public.tareas",{ raw: true }).then(tareas => {
      res.send(tareas);
      res.render('customers', {
         data: tareas
      });
    });*/
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
/*
controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO customer set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/');
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
      res.render('tareas_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
};

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
