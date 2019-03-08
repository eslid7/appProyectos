-- to create a new database
CREATE DATABASE appproyectos;

-- to use database
use appproyectos;


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
   NOMBRE               VARCHAR(50)          null,
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
