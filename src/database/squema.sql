CREATE DATABASE coinsmaster;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS  teams (
  code VARCHAR NOT NULL UNIQUE,
  name VARCHAR NOT NULL,
  classroom VARCHAR NOT NULL,
  habilitiy1 VARCHAR NOT NULL,
  habilitiy2 VARCHAR NOT NULL,
  habilitiy3 VARCHAR NOT NULL,
  habilitiy4 VARCHAR NOT NULL,
  habilitiy5 VARCHAR NOT NULL,
  coins INT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  photo VARCHAR,
  team_code VARCHAR NOT NULL,
  role VARCHAR NOT NULL,
  FOREIGN KEY (team_code) REFERENCES teams (code)
);

CREATE TABLE IF NOT EXISTS  avaliations (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  sprint INT NOT NULL,
  habilitiy1 INT NOT NULL,
  habilitiy2 INT NOT NULL,
  habilitiy3 INT NOT NULL,
  habilitiy4 INT NOT NULL,
  habilitiy5 INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS  feedbacks (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  sprint INT NOT NULL,
  description VARCHAR NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
