//userRoutes.js
import express from 'express';
import { createUser, retriveDetails, loginUser, logoutUser, uploadProfilePicture, checkSession } from '../controllers/userController.js';
import multer from 'multer';


const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) {
            callback(null, true);
        } else {
            callback(new Error('Only image files are allowed!'), false);
        }
    },
});


const router = express.Router();


router.post('/register', createUser);
router.post('/:userId/upload', upload.single('profilePicture'), uploadProfilePicture);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/session-status', checkSession);
router.get('/:userId', retriveDetails);

export default router;