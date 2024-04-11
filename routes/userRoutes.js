//userRoutes.js
import express from 'express';
import { createUser, loginUser, logoutUser, uploadProfilePicture,
        checkSession, createPost, getFeedPosts, getCommunityPosts, uploadPostImage,
        getCurrentUser, getSuggestedUsers, followUser, unfollowUser,getFollowedUsers,
        getUserPostsByUsername} from '../controllers/userController.js';

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'assets', 'images'));
    },
    filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
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
router.post('/posts', createPost);
router.post('/posts/:postId/upload', upload.single('image'), uploadPostImage);
router.get('/posts/feed', getFeedPosts);
router.get('/posts/community/:community', getCommunityPosts);
router.get('/current', getCurrentUser);
router.get('/suggestions', getSuggestedUsers);
router.post('/follow/:userId', followUser);
router.post('/unfollow/:userId', unfollowUser);
router.get('/following', getFollowedUsers);
router.get('/posts/user/:username', getUserPostsByUsername);


export default router;


