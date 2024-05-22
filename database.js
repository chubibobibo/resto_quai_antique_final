import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
<<<<<<< HEAD
    // port: process.env.MYSQL_PORT,
  })
  .promise();
=======
    port: process.env.MYSQL_PORT
}).promise()

>>>>>>> 4b1b3bb34a0f345f7ec7df8e5c4360185487e3cd

export async function getImages(id) {
  const [image] = await pool.query(
    `
        SELECT * FROM images
<<<<<<< HEAD
        WHERE id = ?`,
    [id]
  );
  return image[0];
}
=======
        WHERE id = ?`, [id]
    )
    return image[0]
};
>>>>>>> 4b1b3bb34a0f345f7ec7df8e5c4360185487e3cd
// // const result = await getImages(3)
// // console.log(result)

// selecting all images
export async function getAll() {
<<<<<<< HEAD
  const [allImages] = await pool.query(`
        SELECT * FROM images`);
  return allImages[0];
=======
    const [allImages] = await pool.query(
        `SELECT * FROM images`
    )
    return allImages[0]
>>>>>>> 4b1b3bb34a0f345f7ec7df8e5c4360185487e3cd
}


// selecting all menu
export async function getMenu() {
  const allMenu = await pool.query(
    `SELECT title, description, price, category
        FROM menu`
<<<<<<< HEAD
  );
  return allMenu[0];
}
=======
    )
    return allMenu[0]
};
>>>>>>> 4b1b3bb34a0f345f7ec7df8e5c4360185487e3cd
// const result = await getMenu()
// console.log(result)

// selecting entrees from menu
export async function getEntrees() {
  const allEntrees = await pool.query(
    `SELECT * FROM menu
        WHERE category = 'Entrées'`
  );
  return allEntrees[0];
}

<<<<<<< HEAD
=======


>>>>>>> 4b1b3bb34a0f345f7ec7df8e5c4360185487e3cd
// selecting plats from the menu
export async function getPlats() {
  const allPlats = await pool.query(
    `SELECT * FROM menu
        WHERE category = 'Plats'`
<<<<<<< HEAD
  );
  return allPlats[0];
}
=======
    )
    return allPlats[0]
};
>>>>>>> 4b1b3bb34a0f345f7ec7df8e5c4360185487e3cd

// selecting desserts from menu
export async function getDesserts() {
  const allDesserts = await pool.query(
    `SELECT * FROM menu
        WHERE category = 'Desserts'`
<<<<<<< HEAD
  );
  return allDesserts[0];
}
=======
    )
    return allDesserts[0]
};
>>>>>>> 4b1b3bb34a0f345f7ec7df8e5c4360185487e3cd

// inserting data from reservation form
//logic for inserting a new reservation using the date,miditime, soirtime,
//covers, name, email as the parameters, then using them in an array
//for the insert query(this means that these are the datas that we
//will be accepting from the forms)
//Update: included user_id
<<<<<<< HEAD
export async function createReservation(
  date,
  time,
  covers,
  name,
  email,
  user_id,
  allergies
) {
  const newReservation = await pool.query(
    `INSERT INTO reservations(date, time, covers, name, email, user_id, allergies)
        VALUES(?, ?, ?, ?, ?, ?, ?)`,
    [date, time, covers, name, email, user_id, allergies]
  );
  return newReservation[0];
}
=======
export async function createReservation(name, email, covers, date, time, allergies, user_id) {
    const newReservation = await pool.query(
        `INSERT INTO reservations(name, email, covers, date, time, allergies, user_id)
        VALUES(?, ?, ?, ?, ?, ?, ?)`, [name, email, covers, date, time, allergies, user_id]
    )
    return newReservation[0]
};
>>>>>>> 4b1b3bb34a0f345f7ec7df8e5c4360185487e3cd

// inserting data from the register form
//will expect a username and password to be passed in the function.
//These arguments will come from the register form
//added 2 new columns in the database( covers and allergies)
export async function register(email, password, covers, allergies) {
<<<<<<< HEAD
  const newRegister = await pool.query(
    `INSERT INTO users(email, password, covers, allergies)
        VALUES(?, ?, ?, ?)`,
    [email, password, covers, allergies]
  );
  return newRegister[0];
}

//adding admin user
export async function registerAdmin(
  email,
  password,
  covers,
  account_type,
  allergies
) {
  const newRegisterAdmin = await pool.query(
    `INSERT INTO users(email, password, covers, account_type,allergies)
        VALUES(?, ?, ?, ?, ?)`,
    [email, password, covers, account_type, allergies]
  );
  return newRegisterAdmin[0];
}
=======
    const newRegister = await pool.query(
        `INSERT INTO users(email, password, covers, allergies)
        VALUES(?, ?, ?, ?)`, [email, password, covers, allergies]
    )
    return newRegister[0]
};

//adding admin user
export async function registerAdmin(email, password, account_type) {
    const newRegisterAdmin = await pool.query(
        `INSERT INTO users(email, password, account_type)
        VALUES(?, ?, ?)`, [email, password, account_type]
    )
    return newRegisterAdmin[0]
};
>>>>>>> 4b1b3bb34a0f345f7ec7df8e5c4360185487e3cd


// searching for a username
export async function login(email, password) {
  const foundLogin = await pool.query(
    `SELECT * FROM users
        WHERE email = ?`,
    [email]
  );
  return foundLogin[0];
}

export async function idLogin(id) {
    const idLoggedIn = await pool.query(
        `SELECT * FROM users
        WHERE id = ?`, [id]
    )
    return idLoggedIn[0]
};

// search a specific photo
export async function getPhoto(id) {
  const newPhoto = await pool.query(
    `SELECT * FROM images
        WHERE id = ?`,
    [id]
  );
  return newPhoto[0];
}

// updating the image table
export async function updatePhoto(image_url, id) {
  const newPhoto = await pool.query(
    `UPDATE images
        SET imageUrl = ? 
        WHERE id = ?`,
    [image_url, id]
  );
  return newPhoto[0];
}

//adding menu items
export async function addMenu(title, category, price, description) {
  const newMenu = await pool.query(
    `INSERT INTO menu (title, category, price, description)
        VALUES (?, ?, ?, ?)`,
    [title, category, price, description]
  );
  return newMenu[0];
}

// deleting multiple rows depending on what the delete form sends
//fix error when deleting multiple select options.
export async function removeMenu(id) {
  const deleteMenu = await pool.query(
    `DELETE FROM menu
        WHERE id IN (?)`,
    [id]
  );
  return deleteMenu[0];
}

//creating reservations without being logged in.
<<<<<<< HEAD
export async function defaultReservation(date, time, name, email) {
  const defReservation = await pool.query(
    `INSERT INTO reservations(date, time, name, email)
        VALUES(?, ?, ?, ?)`,
    [date, time, name, email]
  );
  return defReservation[0];
}
=======
export async function defaultReservation(name, email, date, time, allergies) {
    const defReservation = await pool.query(
        `INSERT INTO reservations(name, email, date, time, allergies)
        VALUES(?, ?, ?, ?, ? )`, [name, email, date, time, allergies]
    )
    return defReservation[0]
};
>>>>>>> 4b1b3bb34a0f345f7ec7df8e5c4360185487e3cd

// selecting a specific reservation date then summing up all the covers
export async function reservationDate(date) {
  const specificDate = await pool.query(
    `SELECT SUM(covers) AS total_covers
        FROM  reservations
<<<<<<< HEAD
        WHERE date = ?`,
    [date]
  );
  return specificDate[0];
}

//selecting opening days and hours
export async function getHours() {
  const allHours = await pool.query(
    `SELECT *
        FROM hours`
  );
  return allHours[0];
}
=======
        WHERE date = ?`, [date]
    )
    return specificDate[0]
};

//selecting opening days and hours
export async function getHours() {
    const allHours = await pool.query(
        `SELECT
        id,
        day,
        TIME_FORMAT(first_opening, "%H %i") AS first_opening,
        TIME_FORMAT(first_closing, "%H %i") AS first_closing,
        TIME_FORMAT(second_opening, "%H %i") AS second_opening,
        TIME_FORMAT(second_closing, "%H  %i") AS second_closing 
        FROM hours`
    )
    return allHours[0]
};
>>>>>>> 4b1b3bb34a0f345f7ec7df8e5c4360185487e3cd

// selecting specific days and hours
export async function specificHours(id) {
  const specHours = await pool.query(
    `SELECT * 
        FROM hours
<<<<<<< HEAD
        WHERE id = ?`,
    [id]
  );
  return specHours[0];
}
=======
        WHERE id = ?`, [id]
    )
    return specHours[0]
};
>>>>>>> 4b1b3bb34a0f345f7ec7df8e5c4360185487e3cd

//updating the hours table
export async function updateHours(
  first_opening,
  first_closing,
  second_opening,
  second_closing,
  id
) {
  const updatedHours = await pool.query(
    `UPDATE hours
        SET
        first_opening = ?, first_closing = ?, second_opening = ?, second_closing = ?
<<<<<<< HEAD
        WHERE id = ?`,
    [first_opening, first_closing, second_opening, second_closing, id]
  );
  return updatedHours[0];
}

//selecting specific user
export async function getUser(id) {
  const specUser = await pool.query(
    `SELECT * FROM users
        WHERE id = ?`,
    [id]
  );
  return specUser[0];
}
=======
        WHERE id = ?`, [first_opening, first_closing, second_opening, second_closing, id]
    )
    return updatedHours[0]
};

//selecting specific user
export async function getUser(id) {
    const specUser = await pool.query(
        `SELECT * FROM users
        WHERE id = ?`, [id]
    )
    return specUser[0]
};
>>>>>>> 4b1b3bb34a0f345f7ec7df8e5c4360185487e3cd
