# Quai_Antique

Quai_Antique is a restaurant web app project that is made with express-mysql. It implements basic CRUD for creating reservations and authentication / authorization for managing the site's contents.

## Prerequisites
A machine that has
- [nodeJS](https://nodejs.org/en)
- [MySql](https://dev.mysql.com/downloads/installer/)
- create an account [Cloudinary](https://cloudinary.com/users/register_free)

## Getting Started

Getting the node server running localy.
- `git clone` this repo `https://github.com/chubibobibo/resto_quai_antique.git`
- Navigate to project folder `cd <path of project folder>`
- `npm install` to install all dependencies.
- Connect to mysql.
- Create a new database.
- Copy the `CREATE TABLE` queries in the `create_database.sql` found at the root of the project directory.
- Copy the `INSERT INTO` queries in the `create_database.sql` to seed the initial values to the database. You can change this later.
- Create a .env file at the root of the project directory and configure it with the credentials from your database

 <img width="468" alt="image" src="https://user-images.githubusercontent.com/105818713/236039546-c4c03da9-bb0e-4afc-b60a-099e423c2c83.png">


- configure the database settings at `database.js` which can be found at the root of the project directory. Comment out / diasble port: process.env.MYSQL_PORT.

    <img width="350" alt="image" src="https://user-images.githubusercontent.com/105818713/235886932-cabe7528-e796-4179-9895-72f4881ec160.png">


- Configure cloudinary
  - Navigate to the `cloudinary` directory at the root of the project directory.
  - Modify the `index.js`
  
  <img width="353" alt="image" src="https://user-images.githubusercontent.com/105818713/235437320-f544a1a6-6c42-4bac-88e0-b9bcd6dcf748.png">


      
- Run `nodemon app.js` in the terminal.

- Run locally using this link: (http://localhost:3000/main)

## Create an admin for managing the web app
go to this link (http://localhost:3000/user/register/admin) to add a new admin user

## Deployed link: 
(https://newquaiantique.onrender.com/main)
