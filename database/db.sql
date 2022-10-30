CREATE DATABASE antpack;
USE antpack;

CREATE TABLE Company(
	id_company VARCHAR(50) PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    catch_phrase VARCHAR(100),
    bs VARCHAR(100)
);

CREATE TABLE Address(
	id_address VARCHAR(50) PRIMARY KEY NOT NULL,
	street VARCHAR(50),
	suite VARCHAR(50),
	city VARCHAR(50),
	zipcode VARCHAR(50),
	lat VARCHAR(50),
    lng VARCHAR(50)
);

CREATE TABLE User( 
	id_user VARCHAR(50) PRIMARY KEY NOT NULL,
	name VARCHAR(100),
	username VARCHAR(50),
	email VARCHAR(50),
	phone VARCHAR(50),
	website VARCHAR(50),
	id_company VARCHAR(50) NOT NULL,
	id_address VARCHAR(50) NOT NULL,
	FOREIGN KEY (id_company) REFERENCES Company(id_company),
    FOREIGN KEY (id_address) REFERENCES Address(id_address)
);





