import * as cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'


//setup the cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//SETUP THE STORAGE
//refer to the multer-cloudinary-storage docs
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'quai_antique2',
        format: async (req, file) => {
            return 'jpeg', 'jpg', 'png';
        },

    }
})
export default { cloudinary, storage }
