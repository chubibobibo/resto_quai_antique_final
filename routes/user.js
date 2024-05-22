import express from 'express';
const router = express.Router();
import path from 'path';
import { register, login, registerAdmin } from '../database.js';
import { fileURLToPath } from 'url';
import catchAsync from '../utils/catchAsync.js'

import bcrypt from 'bcrypt'
import multer from 'multer'



// configure the storage object where to store the images
// cb is a callback function 
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// import { storage } from './cloudinary/index.js'
const upload = multer({ storage: storage })
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// registering a user
router.get('/register', (req, res) => {
    res.render('./users/register.ejs')
})

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { reg_name, reg_password, reg_defaultCovers, reg_allergies } = req.body
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(reg_password, salt)
        //UPDATE: flashing error if email exists upon registering
        const foundUser = await login(reg_name);
        if (reg_name !== foundUser.email) {
            const newUser = await register(reg_name, hashPassword, reg_defaultCovers, reg_allergies)
            req.flash('success', 'New user created')
            res.redirect('/main')
        } else {
            req.flash('error', 'email already exists')
        }
        //end of UPDATE
    } catch (err) {
        console.log(err)
        res.status(500).send('Ooops there is a problem')
    }
}))

//logging a user
router.get('/login', (req, res) => {
    res.render('./users/login.ejs')
})

router.post('/login', catchAsync(async (req, res) => {
    const { login_name, login_password } = req.body;
    const foundLogin = await login(login_name)
    const loggedUser = await bcrypt.compare(login_password, foundLogin[0].password)
    if (loggedUser) {
        req.session.user_id = foundLogin[0].id
        req.flash('success', `Welcome ${foundLogin[0].email}`)
    } else { req.flash('error', 'Invalid username or password') }
    // console.log(req.session)
    // console.log(req.session.user_id)
    // console.log(foundLogin[0].allergies)
    res.redirect('/main')
}))

// logging out a user
router.get('/logout', (req, res) => {
    req.session.user_id = null;
    req.flash('success', 'Logged out')
    res.redirect('/user/login')
})

//creating an admin user
router.get('/register/admin', (req, res) => {
    res.render('./users/createAdmin.ejs')
})

router.post('/register/admin', catchAsync(async (req, res) => {
    try {
        const { admin_name, admin_password, admin_defaultCovers, admin_account_type, admin_allergies } = req.body
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(admin_password, salt)
        const newUser = await registerAdmin(admin_name, hashPassword, admin_defaultCovers, admin_account_type, admin_allergies)
        // const newDefaults = await registerDefaults(reg_defaultCovers, reg_allergies)
        // console.log(newUser)
        req.flash('success', 'New user created')
        res.redirect('/main')
    } catch (err) {
        console.log(err)
        res.status(500).send('Ooops there is a problem')
    }
}))

export default router