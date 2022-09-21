CREATE DATABASE coinsmaster;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS  teams (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  code VARCHAR NOT NULL,
  classroom VARCHAR NOT NULL,
  habilities VARCHAR NOT NULL
);

CREATE TABLE users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  photo VARCHAR,
  team_id UUID NOT NULL,
  role VARCHAR NOT NULL,
  FOREIGN KEY (team_id) REFERENCES teams (id)
);
