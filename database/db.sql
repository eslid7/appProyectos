-- to create a new database
CREATE DATABASE appproyectos;

-- to use database
use appproyectos;
	-- SEQUENCE: public.categorias_categoria_id_seq

-- DROP SEQUENCE public.categorias_categoria_id_seq;

CREATE SEQUENCE public.categorias_categoria_id_seq;

ALTER SEQUENCE public.categorias_categoria_id_seq
    OWNER TO postgres;
	
	-- SEQUENCE: public.idtarea_a_seq

-- DROP SEQUENCE public.idtarea_a_seq;

CREATE SEQUENCE public.idtarea_a_seq;

ALTER SEQUENCE public.idtarea_a_seq
    OWNER TO postgres;
	
-- SEQUENCE: public.proyectos_proyectos_id_seq

-- DROP SEQUENCE public.proyectos_proyectos_id_seq;

CREATE SEQUENCE public.proyectos_proyectos_id_seq;

ALTER SEQUENCE public.proyectos_proyectos_id_seq
    OWNER TO postgres;

-- SEQUENCE: public.recursos_recursos_id_seq

-- DROP SEQUENCE public.recursos_recursos_id_seq;

CREATE SEQUENCE public.recursos_recursos_id_seq;

ALTER SEQUENCE public.recursos_recursos_id_seq
    OWNER TO postgres;

-- SEQUENCE: public.usuarios_id_seq

-- DROP SEQUENCE public.usuarios_id_seq;

CREATE SEQUENCE public.usuarios_id_seq;

ALTER SEQUENCE public.usuarios_id_seq
    OWNER TO postgres;	
	
-- Table: public.categorias

-- DROP TABLE public.categorias;

CREATE TABLE public.categorias
(
    id_categoria numeric NOT NULL DEFAULT nextval('categorias_categoria_id_seq'::regclass),
    nombre character varying(50) COLLATE pg_catalog."default",
    descripcion character varying(150) COLLATE pg_catalog."default",
    CONSTRAINT pk_categorias PRIMARY KEY (id_categoria)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.categorias
    OWNER to postgres;	
	
	
-- Table: public.proyectos

-- DROP TABLE public.proyectos;

CREATE TABLE public.proyectos
(
    id_proyectos numeric NOT NULL DEFAULT nextval('proyectos_proyectos_id_seq'::regclass),
    nombre character varying(50) COLLATE pg_catalog."default",
    colaboradores character varying(100) COLLATE pg_catalog."default",
    descripcion character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT pk_proyectos PRIMARY KEY (id_proyectos)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.proyectos
    OWNER to postgres;

-- Table: public.recursos

-- DROP TABLE public.recursos;

CREATE TABLE public.recursos
(
    id_recursos numeric NOT NULL DEFAULT nextval('recursos_recursos_id_seq'::regclass),
    nombre character varying(50) COLLATE pg_catalog."default",
    porhora real,
    departamento character varying(150) COLLATE pg_catalog."default",
    CONSTRAINT pk_recursos PRIMARY KEY (id_recursos)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.recursos
    OWNER to postgres;

-- Table: public.tareas

-- DROP TABLE public.tareas;

CREATE TABLE public.tareas
(
    id numeric NOT NULL DEFAULT nextval('idtarea_a_seq'::regclass),
    id_recursos numeric,
    id_proyectos numeric,
    horas real,
    id_categoria numeric,
    CONSTRAINT pk_tareas PRIMARY KEY (id),
    CONSTRAINT fk_tareas_reference_proyecto FOREIGN KEY (id_proyectos)
        REFERENCES public.proyectos (id_proyectos) MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    CONSTRAINT fk_tareas_reference_recursos FOREIGN KEY (id_recursos)
        REFERENCES public.recursos (id_recursos) MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tareas
    OWNER to postgres;

-- Table: public.usuarios

-- DROP TABLE public.usuarios;

CREATE TABLE public.usuarios
(
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    firstname character varying(50) COLLATE pg_catalog."default",
    lastname character varying(50) COLLATE pg_catalog."default",
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    salt character varying(90) COLLATE pg_catalog."default",
    id integer DEFAULT nextval('usuarios_id_seq'::regclass),
    roll integer,
    CONSTRAINT "pkEmail" PRIMARY KEY (email)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.usuarios
    OWNER to postgres;	