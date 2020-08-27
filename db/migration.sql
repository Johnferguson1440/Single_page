--DROP DATABASE IF EXISTS drinks;
--CREATE DATABASE drinks;
--\c drinks



CREATE TABLE   drinks(
    ID serial PRIMARY KEY,
    name varchar(30),
    type varchar(30),
    image text,
    link text
    
); 

CREATE TABLE  bartender(
    ID serial PRIMARY KEY,
    name varchar(30),
    quote text,
    drinkID integer,
CONSTRAINT fk_drinkID
FOREIGN KEY (drinkID)
REFERENCES drinks(ID)
    
); 