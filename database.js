import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()


const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'password123',
    database: 'test_resto2',
    // port: '3000'
}).promise()


export async function getImages(id) {
    const [image] = await pool.query(`
        SELECT * FROM images
        WHERE id = ?`, [id]
    )
    return image[0]
}
// // const result = await getImages(3)
// // console.log(result)

// selecting all images
export async function getAll() {
    const [allImages] = await pool.query(`
        SELECT * FROM images`
    )
    return allImages
}

// selecting all menu
export async function getMenu() {
    const allMenu = await pool.query(
        `SELECT title, description, price, category
        FROM menu`
    )
    return allMenu[0]
}
// const result = await getMenu()
// console.log(result)

// selecting entrees from menu
export async function getEntrees() {
    const allEntrees = await pool.query(
        `SELECT * FROM menu
        WHERE category = 'Entrées'`
    )
    return allEntrees[0]
}
// const resultEntrees = await getEntrees()
// console.log(resultEntrees)

// selecting plats from the menu
export async function getPlats() {
    const allPlats = await pool.query(
        `SELECT * FROM menu
        WHERE category = 'Plats'`
    )
    return allPlats[0]
}

// selecting desserts from menu
export async function getDesserts() {
    const allDesserts = await pool.query(
        `SELECT * FROM menu
        WHERE category = 'Desserts'`
    )
    return allDesserts[0]
}

// inserting data from reservation form
//logic for inserting a new reservation using the date,miditime, soirtime,
//covers, name, email as the parameters, then using them in an array
//for the insert query(this means that these are the datas that we 
//will be accepting from the forms)
//Update: included user_id
export async function createReservation(date, time, covers, name, email, user_id, allergies) {
    const newReservation = await pool.query(
        `INSERT INTO reservations(date, time, covers, name, email, user_id, allergies)
        VALUES(?, ?, ?, ?, ?, ?, ?)`, [date, time, covers, name, email, user_id, allergies]
    )
    return newReservation[0]
}

// inserting data from the register form
//will expect a username and password to be passed in the function.
//These arguments will come from the register form
//added 2 new columns in the database( covers and allergies)
export async function register(email, password, covers, allergies) {
    const newRegister = await pool.query(
        `INSERT INTO users(email, password, covers, allergies)
        VALUES(?, ?, ?, ?)`, [email, password, covers, allergies]
    )
    return newRegister[0]
}

//adding admin user
export async function registerAdmin(email, password, covers, account_type, allergies) {
    const newRegisterAdmin = await pool.query(
        `INSERT INTO users(email, password, covers, account_type,allergies)
        VALUES(?, ?, ?, ?, ?)`, [email, password, covers, account_type, allergies]
    )
    return newRegisterAdmin[0]
}

// adding default_covers and allergies
// export async function registerDefaults(covers, allergies) {
//     const defaults = await pool.query(
//         `INSERT INTO users(covers, allergies)
//         VALUES(?, ?)`, [covers, allergies]
//     )
//     return defaults[0]
// }

// searching for a username 
export async function login(email, password) {
    const foundLogin = await pool.query(
        `SELECT * FROM users
        WHERE email = ?`, [email]
    )
    return foundLogin[0]
};

// search a specific photo
export async function getPhoto(id) {
    const newPhoto = await pool.query(
        `SELECT * FROM images
        WHERE id = ?`, [id]
    )
    return newPhoto[0]
};

// updating the image table
export async function updatePhoto(image_url, id) {
    const newPhoto = await pool.query(
        `UPDATE images
        SET imageUrl = ? 
        WHERE id = ?`, [image_url, id]
    )
    return newPhoto[0]
};

//adding menu items
export async function addMenu(title, category, price, description) {
    const newMenu = await pool.query(
        `INSERT INTO menu (title, category, price, description)
        VALUES (?, ?, ?, ?)`, [title, category, price, description]
    )
    return newMenu[0]
};

// deleting multiple rows depending on what the delete form sends
//fix error when deleting multiple select options.
export async function removeMenu(id) {
    const deleteMenu = await pool.query(
        `DELETE FROM menu
        WHERE id IN (?)`, [id]
    )
    return deleteMenu[0]
};

//creating reservations without being logged in.
export async function defaultReservation(date, time, covers, name, email) {
    const defReservation = await pool.query(
        `INSERT INTO reservations(date, time, covers, name, email)
        VALUES(?, ?, ?, ?, ?)`, [date, time, covers, name, email]
    )
    return defReservation[0]
};

// selecting a specific reservation date
export async function reservationDate(date) {
    const specificDate = await pool.query(
        `SELECT SUM(covers) AS total_covers
        FROM  reservations
        WHERE date = ?`, [date]
    )
    return specificDate[0]
}

//selecting opening days and hours
export async function getHours() {
    const allHours = await pool.query(
        `SELECT *
        FROM hours`
    )
    return allHours[0]
}

// selecting specific days and hours
export async function specificHours(id) {
    const specHours = await pool.query(
        `SELECT * 
        FROM hours
        WHERE id = ?`, [id]
    )
    return specHours[0]
}

//updating the hours table
export async function updateHours(first_opening, first_closing, second_opening, second_closing, id) {
    const updatedHours = await pool.query(
        `UPDATE hours
        SET
        first_opening = ?, first_closing = ?, second_opening = ?, second_closing = ?
        WHERE id = ?`, [first_opening, first_closing, second_opening, second_closing, id]
    )
    return updatedHours[0]
}

//selecting specific user
export async function getUser(id) {
    const specUser = await pool.query(
        `SELECT * FROM users
        WHERE id = ?`, [id]
    )
    return specUser[0]
}