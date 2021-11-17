CREATE DATABASE crud_database;

USE crud_database;

CREATE TABLE users (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    passwrd VARCHAR(64) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

USE crud_database;

CREATE TABLE links (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    lurl VARCHAR(255) NOT NULL,
    descrip TEXT,
    user_id INT(11),
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);