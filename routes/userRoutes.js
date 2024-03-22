import express from 'express';
import { createUser, retriveDetails } from '../controllers/userController.js';
import multer from 'multer';


const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
});


const router = express.Router();

router.post('/register', upload.single('profilePicture'), createUser);
router.get('/:userId', retriveDetails);

export default router;