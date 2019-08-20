/*****************************************************************************************************************************************************************
                                              Defino constantes necesarias para el controlador y modelos Sequelize
******************************************************************************************************************************************************************/
const controller = {};
const sequelize = require('../../database/dbConfig');


const pModel = require('../models/proyectosModel');
const tModel = require('../models/tareasModel');
const cModel = require('../models/categoriasModel');
const rModel = require('../models/recursosModel');
const uModel = require('../models/usuariosModel');

/*****************************************************************************************************************************************************************
                                                              Defino relaciones modelo Sequelize
******************************************************************************************************************************************************************/
rModel.hasMany(tModel, {foreignKey: 'id_recursos'})
tModel.belongsTo(rModel, {foreignKey: 'id_recursos'})

cModel.hasMany(tModel, {foreignKey: 'id_categoria'})
tModel.belongsTo(cModel, {foreignKey: 'id_categoria'})
/************************************************************************************************************************************************************
                          Función encargada de cargar los datos necesarios para las Listas a las tablas del index
*************************************************************************************************************************************************************/
controller.list = (req, res) => {
          const queryProyectosAll = 'SELECT COUNT("id_proyectos") FROM "proyectos" WHERE "creador" ='+ global.User.id +" or colaboradores like '"+ global.User.email+"'";
          sequelize.query(queryProyectosAll) //obtenemos proyectos
           .then(proyectosAll => {
             const queryProyectosCountAct = 'SELECT COUNT("id_proyectos") FROM "proyectos"  WHERE estado=true and "creador" ='+ global.User.id +" or colaboradores like '"+ global.User.email+"'";
             sequelize.query(queryProyectosCountAct) //obtenemos proyectos
              .then(proyectosCountAct => {
               rModel.findAll()
               .then(recursosAll => {
                 const queryProyectosActivos = 'select proyectos.*, usuarios.firstname, usuarios.lastname from proyectos, usuarios where proyectos.creador = usuarios.id and proyectos.estado=true and ( creador ='+ global.User.id +" or colaboradores like '"+ global.User.email+"') order by id_proyectos";
                 sequelize.query(queryProyectosActivos) //obtenemos proyectos
                 .then(proyectosActivos => {
                   const queryProyectosInactivos = 'select proyectos.*, usuarios.firstname, usuarios.lastname from proyectos, usuarios where proyectos.creador = usuarios.id and proyectos.estado=false and ( creador ='+ global.User.id +" or colaboradores like '"+ global.User.email+"') order by id_proyectos";
                   sequelize.query(queryProyectosInactivos) //obtenemos proyectos
                    .then(proyectosInactivos => {
                 //res.send(proyectosAll[1].rows[0].count)
                    uModel.findAll()
                      .then(usersAll => {
                          res.render('index', {
                          proyectosAll: proyectosAll[1].rows[0],
                          proyectosCountAct: proyectosCountAct[1].rows[0],
                          recursosAll:recursosAll,
                          proyectosActivos:proyectosActivos[1].rows,
                          proyectosInactivos:proyectosInactivos[1].rows,
                          usersAll: usersAll
                        })
                      })
                  })
                })
              })
            })
    })
  .catch(err => console.log(err));
};
/*****************************************************************************************************************************************************************
                                                            Lista body de la tabla tareas y datos de tabs
/******************************************************************************************************************************************************************/
controller.listBodyTareas = (req, res) => {
  const idProyecto = req.body.selectedProyect;
  
    const queryCategorias = 'select distinct categorias.nombre, tareas.id_categoria from categorias, tareas where tareas.id_categoria = categorias.id_categoria and tareas.id_proyectos = '+ idProyecto + ' order by id_categoria';
    sequelize.query(queryCategorias) //obtenemos Categorías de tabla tareas
    .then(categorias => {
      const queryRecursos = 'select distinct recursos.nombre, tareas.id_recursos from recursos, tareas where tareas.id_recursos = recursos.id_recursos and tareas.id_proyectos = '+ idProyecto +' order by id_recursos';
      sequelize.query(queryRecursos) //obtenemos Colaboradores de tabla tareas
      .then(recursos => {
        const queryTareas = 'select  recursos.nombre, tareas.id_recursos,  recursos.porhora, categorias.nombre, tareas.id_categoria,  tareas.horas from tareas, recursos, categorias where tareas.id_recursos = recursos.id_recursos and tareas.id_categoria = categorias.id_categoria and tareas.id_proyectos = '+ idProyecto +' order by  tareas.id_recursos, tareas.id_categoria';
        sequelize.query(queryTareas) //obtenemos Tareas de tabla tareas
        .then(tareas => {
            cModel.findAll()          //se obtienen todos los recuros, categorías y proyectos guardados
            .then(categoriasAll => {
              rModel.findAll()
              .then(recursosAll => {
                pModel.findAll()
                .then(proyectosAll => {
                  // console.log(usersAll[1].rowCount);
                  //res.send(tareas[1])
                  res.render('index', {
                    categorias: categorias,
                    recursos: recursos,
                    tareas: tareas,
                    idProyecto:idProyecto,
                    categoriasAll: categoriasAll,
                    recursosAll:recursosAll,
                    proyectosAll:proyectosAll,
                    usersAll:usersAll
                    })
                  })
                })
              })
            })
          })
        })
  .catch(err => console.log(err));
};
/*****************************************************************************************************************************************************************
                                                                      Lista Categorías
/*****************************************************************************************************************************************************************/
controller.listCategoriasAll = (req, res) => {
  cModel.findAll()
  .then(categoriasAll => {
    res.render('addCategoriaP', {
      categoriasAll: categoriasAll,
      proyectoid: req.params.id
    })
  })
}
/*****************************************************************************************************************************************************************
                                                            Inserta categorías en Proyectos (tabla tareas)
/*****************************************************************************************************************************************************************/
controller.insertCatProyecto = (req, res) => {
  const idCategoria = req.params.id;
  const idProyecto = req.params.idProyecto;
  const query = 'INSERT INTO tareas (id_categoria, id_proyectos) VALUES ('+idCategoria+", "+idProyecto+")";
  sequelize.query(query).spread((results, metadata) => {
  res.redirect('/');
  })
};
/*****************************************************************************************************************************************************************
                                                                      Lista Recursos
/*****************************************************************************************************************************************************************/
controller.listRecursosAll = (req, res) => {
  rModel.findAll()
  .then(recursosAll => {
    res.render('addRecursoP', {
      recursosAll: recursosAll,
      proyectoid: req.params.id
    })
  })
}
/*****************************************************************************************************************************************************************
                                                            Inserta Recursos en Proyectos  (tabla tareas)
/*****************************************************************************************************************************************************************/
controller.insertRecProyecto = (req, res) => {
  const idRecurso = req.params.id;
  const idProyecto = req.params.idProyecto;
  const query = 'INSERT INTO tareas (id_recursos, id_proyectos) VALUES ('+idRecurso+", "+idProyecto+")";
  sequelize.query(query).spread((results, metadata) => {
  res.redirect('/');  
  })

};
/*****************************************************************************************************************************************************************
                                                                      Inserta Proyectos
/*****************************************************************************************************************************************************************/
controller.insertP = (req, res) => {
  let nombre = req.body.projectName;
  let cliente = req.body.projectClient;
  let codigo = req.body.projectCode;
  let colaboradores = req.body.projectCollaborator;
  let categoria = req.body.projectCategory;
  let current_datetime = new Date()
  let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
  
  const query = 'INSERT INTO proyectos (nombre,estado,fecha_creacion,creador,cliente,codigo, colaboradores, categoria) VALUES ('+"'"+nombre+"', "+true+"," + "'" + formatted_date + "'," + global.User.id + ",'" + cliente +"','" + codigo +"','" + colaboradores +"','" + categoria +"' )";
  sequelize.query(query).spread((results, metadata) => {
    res.status(200).json({
      desc: 'Se ha creado exitosamente.'
    })
  }).catch(function (err) {
    // en caso de error se devuelve el error
    console.log('ERROR: ' + err)
    res.status(500).json({
      desc: err
    })
  })
};
/*****************************************************************************************************************************************************************
                                                                      Inserta categorias
/*****************************************************************************************************************************************************************/
controller.insert = (req, res) => {
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  const query = 'INSERT INTO categorias (nombre, descripcion) VALUES ('+"'"+nombre+"', '"+descripcion+"')";
  sequelize.query(query).spread((results, metadata) => {
  res.redirect('/#categorias');
  })
};
/*****************************************************************************************************************************************************************
                                                                      Inserta recursos
/*****************************************************************************************************************************************************************/
controller.insertR = (req, res) => {
  const nombre = req.body.txtNombre;
  const departamento = req.body.txtDepartamento;
  const xhora = req.body.txtCostoHoras;
  const query = 'INSERT INTO recursos (nombre, departamento, porhora) VALUES ('+"'"+nombre+"','"+departamento+"', "+xhora+')';
  sequelize.query(query).spread((results, metadata) => {
  res.redirect('/');
  })
};
/*****************************************************************************************************************************************************************
                                                                        Inserta tareas
/*****************************************************************************************************************************************************************/
controller.insertTareas = (req, res) => {
  var keyNames = Object.keys(req.body); //obtengo array con nombres de los input
  keyNames.forEach(function (element){ //se analiza cada nombre por separado
    let nameInput= element;
    let i = nameInput.search("_") + 1; //indice inicio idCategoria
    let j = nameInput.indexOf("_", i); //indice fin idCategoria
    let k = nameInput.length;
    let idCategoria = nameInput.substring(i, j);
    let idRecurso = nameInput.substr(j+1, k);
    let idProyecto = req.params.idProyecto;
    let horasStr = "req.body."+nameInput;
    let horas = eval(horasStr);

    tModel.count({ where: {'id_categoria': idCategoria, 'id_recursos': idRecurso, 'id_proyectos':idProyecto} }).then(result => {
      if(result>0 && horas!=""){
        console.log("entra if");
        const query = 'UPDATE tareas SET horas='+horas+' WHERE id_recursos='+idRecurso+' AND id_proyectos='+idProyecto+' AND id_categoria='+idCategoria;
        sequelize.query(query).spread((results, metadata) => {
        });
      }
      else if(result === 0 && horas!=""){
        console.log("entra else");
        const query = 'INSERT INTO tareas (id_recursos, id_proyectos, id_categoria, horas) VALUES ('+idRecurso+","+idProyecto+","+idCategoria+","+horas+')';
        sequelize.query(query).spread((results, metadata) => {
        });
      }
    });

  });
  //res.send(keyNames);
  res.redirect('/');
};
/*****************************************************************************************************************************************************************
                                                              Carga categorias para vista edit
/*****************************************************************************************************************************************************************/
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


                          usersAll: usersAll
      res.render('tareas_edit', {
        data: categorias
      })
    })
    .catch(err => console.log(err));
};
/*****************************************************************************************************************************************************************
                                                                        Update categorias
/*****************************************************************************************************************************************************************/
controller.updateC = (req, res) => {
  const  idC  = req.params.id;
  const nombre = req.body.nombre;
  const descripcion =  req.body.descripcion;
  const query = 'UPDATE categorias set nombre='+"'"+ nombre +"'"+', descripcion=' + "'"+ descripcion +"'"+' where id_categoria =' + idC;
  //res.send(nombre);
  sequelize.query(query).spread((results, metadata) => {
    res.redirect('/');
  });
};
/*****************************************************************************************************************************************************************
                                                                          Update tareas
/*****************************************************************************************************************************************************************/
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
/*****************************************************************************************************************************************************************
                                                                Carga recursos para vista edit
/*****************************************************************************************************************************************************************/
controller.editR = (req, res) => {
  const  idR  = req.params.id;
  rModel.findAll(
    {
      where: {
        id_recursos: idR
      }
    }
  )
    .then(recursos => {
      //console.log(categorias);
      //res.send(recursos[0].nombre)
      res.render('recursos_edit', {
        data: recursos
      })
    })
    .catch(err => console.log(err));
};
/*****************************************************************************************************************************************************************
                                                                        Update recurso
/*****************************************************************************************************************************************************************/
controller.updateR = (req, res) => {
  const  idR  = req.params.id;
  const nombre = req.body.nombre;
  const departamento =  req.body.txtDepartamento;
  const porhora = req.body.horas;
  const query = 'UPDATE recursos set nombre='+"'"+ nombre +"'"+', departamento=' + "'"+ departamento +"'"+', porhora='+porhora+' where id_recursos =' + idR;
  //res.send(nombre);
  sequelize.query(query).spread((results, metadata) => {
    res.redirect('/');
  });
};
/*****************************************************************************************************************************************************************
                                                              Carga Proyecto para vista create
/*****************************************************************************************************************************************************************/
controller.createPe = (req, res) => {
  uModel.findAll()
    .then(usersAll => {
      res.render('proyectos_new', {
        usersAll: usersAll
      })
    })
  .catch(err => console.log(err));
};
/*****************************************************************************************************************************************************************
                                                              Carga Proyecto para vista edit
/*****************************************************************************************************************************************************************/
controller.editP = (req, res) => {
  const  idP  = req.params.id;
  pModel.findAll(
    {
      where: {
        id_proyectos: idP
      }
    }
  )
    .then(proyectos => {
    //  console.log(categorias);
      //res.send(tareas[0].nombre)
      uModel.findAll()
        .then(usersAll => { 
          res.render('proyectos_edit', {
          data: proyectos,
          usersAll :usersAll
        })
      })
    })
    .catch(err => console.log(err));
};
/*****************************************************************************************************************************************************************
                                                                        Update Proyectos
/*****************************************************************************************************************************************************************/
controller.updateP = (req, res) => {
  let idP  = req.params.id;
  let nombre = req.body.projectName;
  let cliente = req.body.projectClient;
  let codigo = req.body.projectCode;
  let colaboradores = req.body.projectCollaborator;
  let categoria = req.body.projectCategory;
  
  const query = 'UPDATE proyectos set nombre='+"'"+ nombre +"'"+', cliente=' + "'"+ cliente +"'"+', codigo=' + "'"+ codigo +"'"+', colaboradores=' + "'"+ colaboradores +"'"+', categoria=' + "'"+ categoria +"'"+' where id_proyectos =' + idP;
  //res.send(nombre);
  sequelize.query(query).spread((results, metadata) => {
    res.redirect('/');
  });
};
/*****************************************************************************************************************************************************************
                                                                      Delete Proyecto
/*****************************************************************************************************************************************************************/
controller.deleteP = (req, res) => {
  const  id  = req.params.id;
  const query1 = 'DELETE FROM tareas WHERE id_proyectos = '+id;
  const query2 = 'DELETE FROM proyectos WHERE id_proyectos = '+id;
  sequelize.query(query1).spread((results, metadata) => {     //borro tareas asociadas al proyecto
    sequelize.query(query2).spread((results, metadata) => {  //borro proyecto
      res.redirect('/');
    });
  });
};
/*****************************************************************************************************************************************************************
                                                                      Delete categorias
/*****************************************************************************************************************************************************************/
controller.delete = (req, res) => {
  const  id  = req.params.id;
  const query1 = 'DELETE FROM tareas WHERE id_categoria = '+id;
  const query2 = 'DELETE FROM categorias WHERE id_categoria = '+id;
  sequelize.query(query1).spread((results, metadata) => {     //borro categorias asociadas al proyecto
    sequelize.query(query2).spread((results, metadata) => {  //borro categorias
      res.redirect('/');
    });
  });
};
/*****************************************************************************************************************************************************************
                                                                      Delete recursos
/*****************************************************************************************************************************************************************/
controller.deleteR = (req, res) => {
  const  id  = req.params.id;
  const query1 = 'DELETE FROM tareas WHERE id_recursos = '+id;
  const query2 = 'DELETE FROM recursos WHERE id_recursos = '+id;
  sequelize.query(query1).spread((results, metadata) => {     //borro recursos asociados al proyecto
    sequelize.query(query2).spread((results, metadata) => {  //borro recursos
      res.redirect('/');
    });
  });
};
/*****************************************************************************************************************************************************************
                                                              Delete categorias del Proyecto
/*****************************************************************************************************************************************************************/
controller.deleteCatP = (req, res) => {
  const  id  = req.params.id;
  const  idP  = req.params.idProyecto;
  const query1 = 'DELETE FROM tareas WHERE id_categoria = '+id +' and id_proyectos='+idP;
  sequelize.query(query1).spread((results, metadata) => {     //borro categorias asociadas al proyecto
      res.redirect('/');
  });
};
/*****************************************************************************************************************************************************************
                                                                Delete recursos del Proyecto
/*****************************************************************************************************************************************************************/
controller.deleteRecP = (req, res) => {
  const  id  = req.params.id;
  const  idP  = req.params.idProyecto;
  const query1 = 'DELETE FROM tareas WHERE id_recursos = '+id+' and id_proyectos='+idP;
  sequelize.query(query1).spread((results, metadata) => {     //borro recursos asociados al proyecto
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
controller.getCategoriesFromFile = (req, res) => {
  const fs = require('fs');
  var path = require('path');
  let rawdata = fs.readFileSync(path.resolve(__dirname, '../public/js/categorias.json'));
  let categories = JSON.parse(rawdata);
  res.status(200).json({
    categories: categories
  })
}

module.exports = controller;