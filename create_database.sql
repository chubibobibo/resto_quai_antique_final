--Creating the database
CREATE DATABASE resto_quai_antique;
SHOW DATABASES;
USE resto_quai_antique;

-- IMAGES TABLE
CREATE TABLE images (
	id INT PRIMARY KEY AUTO_INCREMENT,
    imageUrl VARCHAR(255)
);

-- USERS TABLE
CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL UNIQUE,
    covers INT NOT NULL,
    allergies VARCHAR(300) NOT NULL,
    account_type VARCHAR(10) NOT NULL DEFAULT 'client'
);

-- RESERVATIONS TABLE
CREATE TABLE reservations(
	id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    time TIME,
    user_id INT,
    FOREIGN KEY(user_id) REFERENCES users(id),
    covers INT DEFAULT 0,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL,
    allergies VARCHAR(300) DEFAULT 'None Specified',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MENU TABLE
CREATE TABLE menu(
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50),
    description VARCHAR(255),
    price DECIMAL(5,2),
    category VARCHAR(50)
);
-- ----hours table----
CREATE TABLE hours (
	id INT PRIMARY KEY AUTO_INCREMENT,
    day VARCHAR(10) NOT NULL,
    first_opening TIME NOT NULL,
    first_closing TIME NOT NULL,
    second_opening TIME,
    second_closing TIME
    );

------------------------------------------------
-- Inserting to menu table
INSERT INTO menu (title, description, price, category)
VALUE
('entree1', 'Asperges blanches rôties aux oignons blancs caramélisés,
œuf mollet pancetta grillée, crème de reblochon.', 10, 'Entrées'),
('entree2', 'Tarte fine tomates et cèpes aux gambas et magrets de canards fumés,
pistou à l’ail des ours.', 10, 'Entrées'),
('plats1', 'Lieu jaune en écrin de champignons, gaufre de pommes de terre, 
crémeux de patates douces, crème de coquillages au riesling.', 24, 'Plats'),
('plats2','Côte de veau de la ferme de Challonges à la gremolota, polenta au parmesan,
macaron de tête de champignons.', 24, 'Plats'),
('dessert1', 'Moelleux chocolat M’BO et et sa petite crème catalane.',
9, 'Desserts'),
('dessert2', 'Demi sphère chocolat, tartare de fraises au basilic, chantilly mascarpone citron vert.',
9, 'Desserts');

-- Inserting into hours
INSERT INTO hours (day, first_opening, first_closing, second_opening, second_closing)
VALUES
('Monday', '12:00:00', '14:00:00', '19:00:00', '22:00:00'),
('Tuesday', '12:00:00', '14:00:00', '19:00:00', '22:00:00'),
('Wednesday', '12:00:00', '14:00:00', '19:00:00', '22:00:00'),
('Thursday', '12:00:00', '14:00:00', '19:00:00', '22:00:00'),
('Friday', '12:00:00', '14:00:00', '19:00:00', '22:00:00'),
('Saturday', '12:00:00', '14:00:00','',''),
('Sunday', '12:00:00', '14:00:00','','');

-- Inserting inot images
INSERT INTO images(imageUrl)
VALUES 
('https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'),
('https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'),
('https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80');