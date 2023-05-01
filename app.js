import express from 'express';
const app = express();
import path from 'path';
import ejsMate from 'ejs-mate';
import { fileURLToPath } from 'url';
import flash from 'connect-flash'
import session from 'cookie-session'
import multer from 'multer'
import methodOverride from 'method-override'
import main from './routes/main.js';
import user from './routes/user.js';
import ExpressError from './utils/expressError.js'
import dotenv from 'dotenv'
dotenv.config()

// import { getHours, getUser, getAll } from './database.js'



// configure the storage object where to store the images
// cb is a callback function 
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({ storage: storage })
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', ejsMate)

app.use(flash())
app.use(express.urlencoded({ extended: true }))//parse form data
app.use(express.static('public'))
app.use(methodOverride('_method'))

// starting session config
app.use(
    session({
        secret: 'secret',
        saveUninitialized: false,
        resave: false,
        cookie: {
            //setup expiry for the session cookie
            //1000ms to 1s to 1min to 24hrs to 1wk
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true // sets cookie so that it is impossible to access clientside
        }
    })
);

/* MIDDLEWARE */
//storing the req.flash to locals to gain access anywhere
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error')
    res.locals.isLoggedUser = req.session.user_id
    next()
})


// using routes
app.use('/main', main);
app.use('/user', user);


// ROUTES
//restructured routes into main and users

// error handler
app.all('*', (req, res, next) => {
    next(new ExpressError('Page not Found', 404))//passing the error to the next error handler
})

app.use((err, req, res, next) => {
    const { status = 404 } = err
    if (!err.message) {
        err.message = "Oooops there's an error"
    } else {
        res.status(status).render('errorAlert.ejs', { err })
    }
})
//check
const port = process.env.DB_PORT
app.listen(port, () => {
    console.log(`SERVING PORT ${port}`)
})
