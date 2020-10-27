DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
id INTEGER PRIMARY KEY AUTO_INCREMENT,
deptName VARCHAR(255) NOT NULL
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
salary DECIMAL(10,2),
department_id INT,
--Added FOREIGN KEY TO BE REFERENCED LATER
FOREIGN KEY (department_id)
REFERENCES department (id)
-- DELETES all tables referenced by the dept id
ON
DELETE CASCADE
ON
UPDATE NO ACTION
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
role_id INT,
--to be referenced later
FOREIGN KEY (role_id)
REFERENCES role (id)
---- DELETES all tables referenced 
ON
DELETE CASCADE
ON 
UPDATE NO ACTION,

manager_id INT,
FOREIGN KEY (manager_id)
REFERENCES employee (id)
---- DELETES all tables referenced 
ON 
DELETE CASCADE
ON
UPDATE NO ACTION
);