const controller = {};
const sequelize = require('../../database/dbConfig');

const tModel = require('../models/tareasModel');
const cModel = require('../models/categoriasModel');
const rModel = require('../models/recursosModel');

//Defino relaciones
rModel.hasMany(tModel, {foreignKey: 'id_recursos'})
tModel.belongsTo(rModel, {foreignKey: 'id_recursos'})

cModel.hasMany(tModel, {foreignKey: 'id_categoria'})
tModel.belongsTo(cModel, {foreignKey: 'id_categoria'})



/*Lista categorias de la tabla*/
controller.list = (req, res) => {
    //Se utiliza model de Sequelize
/*  tModel.findAll({
    attributes: ['id_categoria'], group: ['id_categoria'],
    where:{id_proyectos:1}, include: [cModel]})  */
    const queryCategorias = 'select distinct categorias.nombre, tareas.id_categoria from categorias, tareas where tareas.id_categoria = categorias.id_categoria and tareas.id_proyectos = 1 order by id_categoria';
    sequelize.query(queryCategorias)               //obtenemos CategoríaS
  .then(categorias => {
  //  console.log(categorias);
    //res.send(tareas[1].nombre)
      /*tModel.findAll({where:{id_proyectos:1}, include: [rModel]})          //obtenemos Colaboradores
      */
      const queryRecursos = 'select distinct recursos.nombre, tareas.id_recursos from recursos, tareas where tareas.id_recursos = recursos.id_recursos and tareas.id_proyectos = 1 order by id_recursos';
      sequelize.query(queryRecursos)
      .then(recursos => {
        const queryTareas = 'select  recursos.nombre, tareas.id_recursos,  recursos.porhora, categorias.nombre, tareas.id_categoria,  tareas.horas from tareas, recursos, categorias where tareas.id_recursos = recursos.id_recursos and categorias.id_categoria = tareas.id_categoria and tareas.id_proyectos = 1 order by  tareas.id_recursos';
        sequelize.query(queryTareas)
        .then(tareas => {
           cModel.findAll()
           .then(categoriasAll => {
             rModel.findAll()
             .then(recursosAll => {
               //res.send(tareas)
            //  console.log(recursos.recurso);
                res.render('index', {
                  data: categorias,
                  recursos: recursos,
                  tareas: tareas,
                  categoriasAll: categoriasAll,
                  recursosAll:recursosAll
            })
           })
        })
      })
    })
  })
  .catch(err => console.log(err));
};


/*Lista body de la tabla*/
controller.listBody = (req, res) => {
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



/*Inserta categorias*/
controller.insert = (req, res) => {
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  const query = 'INSERT INTO categorias (nombre, descripcion) VALUES ('+"'"+nombre+"', '"+descripcion+"')";
  sequelize.query(query).spread((results, metadata) => {
  res.redirect('/#categorias');
  })
};

/*Inserta recursos*/
controller.insertR = (req, res) => {
  const nombre = req.body.txtNombre;
  const departamento = req.body.txtDepartamento;
  const xhora = req.body.txtCostoHoras;
  const query = 'INSERT INTO recursos (nombre, departamento, porhora) VALUES ('+"'"+nombre+"','"+departamento+"', "+xhora+')';
  sequelize.query(query).spread((results, metadata) => {
  res.redirect('/');
  })
};

/*Inserta tareas*/
controller.insertTareas = (req, res) => {
  var keyNames = Object.keys(req.body); //obtengo array con nombres de los input
  keyNames.forEach(function (element){ //se analiza cada nombre por separado
    let nameInput= element;
    let i = nameInput.search("_") + 1; //indice inicio idCategoria
    let j = nameInput.indexOf("_", i); //indice fin idCategoria
    let k = nameInput.length;
    let idCategoria = nameInput.substring(i, j);
    let idRecurso = nameInput.substr(j+1, k);
    let idProyecto = 1;
    let horasStr = "req.body."+nameInput;
    let horas = eval(horasStr);
    if(horas!=""){
      const query = 'INSERT INTO tareas (id_recursos, id_proyectos, id_categoria, horas) VALUES ('+idRecurso+","+idProyecto+","+idCategoria+","+horas+')';
      sequelize.query(query).spread((results, metadata) => {
      });
    }
  });
  //res.send(keyNames);
  res.redirect('/');

};



/*Carga vista para agregar categoria nueva*/
controller.save = (req, res) => {
  res.render('tareas_edit');
};

/*Carga categorias para vista edit*/
controller.edit = (req, res) => {
  const  idE  = req.params.id;
  cModel.findAll(
    {
      where: {
        id_categoria: idE
      }
    }
  )
    .then(categorias => {
      console.log(categorias);
      //res.send(tareas[0].nombre)
      res.render('tareas_edit', {
        data: categorias
      })
    })
    .catch(err => console.log(err));
};

/*Update categorias*/
controller.updateC = (req, res) => {
  const  idC  = req.params.id;
  const nombre = req.body.nombre;
  const horas =  req.body.horas;
  const query = 'UPDATE categorias set nombre='+"'"+ nombre +"'"+', horas=' + horas +' where id_categoria =' + idC;

  //res.send(nombre);
  sequelize.query(query).spread((results, metadata) => {
    res.redirect('/');
  });
};




/*Update tareas*/
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


/*Delete categorias*/
controller.delete = (req, res) => {
  const  id  = req.params.id;
    const query = 'DELETE FROM categorias WHERE id_categoria = '+id;
    sequelize.query(query).spread((results, metadata) => {
      res.redirect('/#categorias');
    });
};

/*Delete recursos*/
controller.deleteR = (req, res) => {
  const  id  = req.params.id;
    const query = 'DELETE FROM recursos WHERE id_recursos = '+id;
    sequelize.query(query).spread((results, metadata) => {
      res.redirect('/');
    });
};


/*Carga vista para agregar categoria nueva*/
controller.addRecurso = (req, res) => {
  res.render('recursos_edit');
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
