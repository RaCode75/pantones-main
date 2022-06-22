CREATE DATABASE db_pantones;

USE db_pantones;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,

);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users   
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

-- CLIENTS TABLE
CREATE TABLE clients (
    id INT(11) NOT NULL,
    cliente VARCHAR(150) NOT NULL,
    trabajo VARCHAR(255) NOT NULL,
    color VARCHAR(20) NOT NULL,
    recipe TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE clients
    ADD PRIMARY KEY (id);

ALTER TABLE clients
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE clients
    MODIFY user_id INT(11) NOT NULL;

ALTER TABLE users
    ADD permisos BOOLEAN NOT NULL DEFAULT 0;

ALTER TABLE clients
    ADD sustrato VARCHAR(20) NOT NULL ;

