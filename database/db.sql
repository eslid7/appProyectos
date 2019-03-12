-- to create a new database
CREATE DATABASE appproyectos;

-- to use database
use appproyectos;

drop table CATEGORIAS;

drop table PROYECTOS;

drop table RECURSOS;

drop table TAREAS;

/*==============================================================*/
/* Table: CATEGORIAS                                            */
/*==============================================================*/
create table CATEGORIAS (
   ID_CATEGORIA         NUMERIC              not null,
   NOMBRE               VARCHAR(50)          null,
   HORAS                FLOAT4               null,
   constraint PK_CATEGORIAS primary key (ID_CATEGORIA)
);

/*==============================================================*/
/* Table: PROYECTOS                                             */
/*==============================================================*/
create table PROYECTOS (
   ID_PROYECTOS         NUMERIC              not null,
   NOMBRE               VARCHAR(50)          null,
   constraint PK_PROYECTOS primary key (ID_PROYECTOS)
);

/*==============================================================*/
/* Table: RECURSOS                                              */
/*==============================================================*/
create table RECURSOS (
   ID_RECURSOS          NUMERIC              not null,
   NOMBRE               VARCHAR(50)          null,
   PORHORA              FLOAT4               null,
   constraint PK_RECURSOS primary key (ID_RECURSOS)
);

/*==============================================================*/
/* Table: TAREAS                                                */
/*==============================================================*/
create table TAREAS (
   ID                   NUMERIC              not null,
   ID_RECURSOS          NUMERIC              null,
   ID_PROYECTOS         NUMERIC              null,
   ID_CATEGORIA         NUMERIC              null,
   HORAS                FLOAT4               null,
   constraint PK_TAREAS primary key (ID)
);

alter table TAREAS
   add constraint FK_TAREAS_REFERENCE_RECURSOS foreign key (ID_RECURSOS)
      references RECURSOS (ID_RECURSOS)
      on delete restrict on update restrict;

alter table TAREAS
   add constraint FK_TAREAS_REFERENCE_PROYECTO foreign key (ID_PROYECTOS)
      references PROYECTOS (ID_PROYECTOS)
      on delete restrict on update restrict;

alter table TAREAS
   add constraint FK_TAREAS_REFERENCE_CATEGORI foreign key (ID_CATEGORIA)
      references CATEGORIAS (ID_CATEGORIA)
      on delete restrict on update restrict;
	  
	  

/*Secuencia de tabla de categorias*/
create sequence categorias_categoria_id_seq
   owned by categorias.ID_CATEGORIA;

alter table categorias
   alter column ID_CATEGORIA set default nextval('categorias_categoria_id_seq');
   
/*Secuencia de tabla de recursos*/   
create sequence recursos_recursos_id_seq
   owned by recursos.ID_RECURSOS;

alter table recursos
   alter column ID_RECURSOS set default nextval('recursos_recursos_id_seq');
   
/*Secuencia de tabla de proyectos*/   
create sequence proyectos_proyectos_id_seq
   owned by proyectos.ID_PROYECTOS;

alter table proyectos
   alter column ID_PROYECTOS set default nextval('proyectos_proyectos_id_seq');   


/*Secuencia de tabla de TAREAS*/   
create sequence tareas_tareas_id_seq
   owned by tareas.ID;

alter table tareas
   alter column ID set default nextval('tareas_tareas_id_seq');   
   

	  
