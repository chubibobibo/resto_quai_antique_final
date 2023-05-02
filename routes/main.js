import express from 'express';
const router = express.Router({ mergeParams: true });
import path from 'path';
import { getAll, getEntrees, getPlats, getDesserts, createReservation, login, getPhoto, updatePhoto, addMenu, removeMenu, defaultReservation, reservationDate, getHours, specificHours, updateHours, getUser } from '../database.js';
import { fileURLToPath } from 'url';
import catchAsync from '../utils/catchAsync.js'
import multer from 'multer'
import * as cloudinaryV2 from 'cloudinary'
import cloudinary from '../cloudinary/index.js'
import methodOverride from 'method-override'




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


//----middleware----
const requireLogin = catchAsync(async (req, res, next) => {
    if (req.session.user_id) {
        const admin = req.session.user_id
        const specUser = await getUser(admin)
        // console.log(specUser)
        if (specUser[0].account_type === 'admin') {
            return next()
        }
    } else {
        req.flash('error', 'You need to be logged in')
        res.redirect('/user/login')
    }
})

// ----routes----
//----index----
router.get('/', async (req, res) => {
    const allImages = await getAll()
    const allHours = await getHours()
    const allEntrees = await getEntrees()
    const allPlats = await getPlats()
    const allDesserts = await getDesserts()
    const user_id = req.session.user_id
    if (user_id) {
        const specUser = await getUser(user_id)
        const foundAdmin = specUser[0].account_type
        // console.log(specUser[0].account_type)
        res.render('./main/index.ejs', { allImages, allHours, allPlats, allEntrees, allDesserts, foundAdmin, user_id })
    } else {
        res.render('./main/index.ejs', { allImages, allHours, allPlats, allEntrees, allDesserts, user_id })
    }

});
//----menu----

router.get('/menu', catchAsync(async (req, res) => {
    const allEntrees = await getEntrees()
    const allPlats = await getPlats()
    const allDesserts = await getDesserts()
    const user_id = req.session.user_id
    if (user_id) {
        const specUser = await getUser(user_id)
        const foundAdmin = specUser[0].account_type
        // console.log(specUser)
        res.render('./main/menu.ejs', { allEntrees, allPlats, allDesserts, foundAdmin, user_id })
    } else {
        const foundAdmin = req.session.user_id
        res.render('./main/menu.ejs', { allEntrees, allPlats, allDesserts, user_id })
    }
}))

router.get('/reservation', async (req, res) => {
    // implementing current date to be passed on reservation.ejs 
    //to limit selection of dates past the current date
    let today = new Date().toISOString().slice(0, 10)
    // console.log(today)
    const user_id = req.session.user_id
    // console.log(loggedUser)
    if (user_id) {
        const foundUser = await getUser(loggedUser)
        res.render('./main/reservation.ejs', { today, foundUser, user_id })
    } else {
        res.render('./main/reservation.ejs', { today, user_id })
    }
})

//creating reservation
//UPDATE: searched the email from the reservation form to find user's
//default allergies and covers.
//use the found default allergies and covers as the value
//if data is not coming from the form.
//UPDATE: defaultReservation for creating a reservation for an anonymous user.
router.post('/reservations', catchAsync(async (req, res) => {
    console.log(req.body)
    // console.log(req.session.user_id)
    const { reservation } = req.body
    // console.log(reservation)
    const user_id = req.session.user_id
    const covers = await reservationDate(reservation.date)
    const isIdLoggedIn = await getUser(user_id)
    const formCover = reservation.covers === "" ? reservation.covers = 0 : parseInt(reservation.covers)
    //There is an existing reservation
    if (covers[0].total_covers !== null) {
        const totalCovers = parseInt(covers[0].total_covers) + formCover
        // console.log(covers)
        console.log(totalCovers)
        // console.log(totalCovers)
        if (totalCovers <= 20) {
            //logged in and no covers provided
            if (!user_id && formCover === 0) {
                await defaultReservation(reservation.name, reservation.email, reservation.date, reservation.time, reservation.allergies)
            } else if (isIdLoggedIn && formCover === 0) {
                const covers = isIdLoggedIn[0].covers
                await createReservation(reservation.name, reservation.email, covers, reservation.date, reservation.time, reservation.allergies, user_id)
            } else {
                await createReservation(reservation.name, reservation.email, reservation.covers, reservation.date, reservation.time, reservation.allergies, user_id)
            }
            // console.log(foundLogin)
            req.flash('success', 'Created a new reservation')
            res.redirect('/main')
        } else {
            req.flash('error', 'Sorry the restaurant is full')
            res.redirect('/main/reservation')
        }
    } else {
        console.log(isIdLoggedIn)
        if (!user_id && formCover === 0) {
            await defaultReservation(reservation.name, reservation.email, reservation.date, reservation.time, reservation.allergies)
        }
        else if (isIdLoggedIn && reservation.covers === 0) {
            const allergies = isIdLoggedIn[0].allergies
            const covers = isIdLoggedIn[0].covers
            await createReservation(reservation.name, reservation.email, covers, reservation.date, reservation.time, allergies, user_id)
        } else {
            await createReservation(reservation.name, reservation.email, reservation.covers, reservation.date, reservation.time, reservation.allergies, user_id)
        }
        // console.log(foundLogin)
        req.flash('success', 'Created a new reservation')
        res.redirect('/main')
    }
}))

// display upload page
//destructure params and use it to find the specific photo
router.get('/edit/:id', requireLogin, async (req, res) => {
    const { id } = req.params
    const newPhoto = await getPhoto(id)
    res.render('./main/edit.ejs', { newPhoto })
});

//uploading images to cloudinary
router.put('/:id', upload.single('photo'), (req, res) => {
    const { id } = req.params
    // console.log(req.file)
    cloudinaryV2.v2.uploader.upload(req.file.path, {
        resource_type: 'image'
    })
        .then((result) => {
            console.log('success', JSON.stringify(result, null, 2))
            const url = result.secure_url
            console.log(url)
            updatePhoto(url, id).then((res) => {
                console.log('image uploaded')
            }).catch((err) => {
                console.log(err)
            })
        }).catch((error) => {
            console.log('error', JSON.stringify(error, null, 2))
        })
    // console.log(req.file.url)
    req.flash('success', 'Image uploaded')
    res.redirect('/main')
})

//edit menu form
router.get('/editMenu', requireLogin, async (req, res) => {
    const allEntrees = await getEntrees()
    const allPlats = await getPlats()
    const allDesserts = await getDesserts()
    res.render('./main/edit_menu.ejs', { allEntrees, allPlats, allDesserts })
})

//adding menu items
router.post('/addmenu', requireLogin, catchAsync(async (req, res) => {
    const { menu } = req.body
    await addMenu(menu.title, menu.category, menu.price, menu.description);
    req.flash('success', 'Added new items the menu!')
    res.redirect('/main/menu')
}))

// deleting menu items
router.post('/deleteMenu', requireLogin, catchAsync(async (req, res) => {
    const { deletedMenu } = req.body;
    console.log(deletedMenu)
    await removeMenu(deletedMenu)
    req.flash('success', 'Deleted a menu item')
    res.redirect('/main/editMenu')
}))

//editing hours
router.get('/editHours/:id', requireLogin, catchAsync(async (req, res) => {
    const { id } = req.params
    const hours = await specificHours(id)
    res.render('./main/edit_hours.ejs', { hours })
}))

router.post('/:id', requireLogin, catchAsync(async (req, res) => {
    const { id } = req.params
    const { editHour } = req.body
    // console.log(req.body)
    const updatedHours = await updateHours(editHour.first_opening, editHour.first_closing, editHour.second_opening, editHour.second_closing, id)
    // console.log(updatedHours)
    req.flash('success', 'updated hours')
    res.redirect('/main')

}))


export default router;