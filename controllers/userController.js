//userContoller.js
import { getDB } from '../models/database.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';



export const loginUser = async (req, res) => {
    try {
        const db = getDB();
        const { username, password } = req.body;
        const user = await db.collection('users').findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            req.session.userId = user._id;
            res.json({ message: 'Logged in successfully' });
        } else {
            res.status(401).json({ message: 'Authentication failed.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.clearCookie('connect.sid'); 
        res.json({ message: 'Logged out successfully' });
    });
};


export const checkSession = (req, res) => {
    if (req.session.userId) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
};

export const createUser = async (req, res) => {
    try {
        const db = getDB(); 
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingUser = await db.collection('users').findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'Registration failed! Username or email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        
        const result = await db.collection('users').insertOne({
            username,
            email,
            password: hashedPassword,
        });
        
        
        req.session.save(err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error on saving session.' });
            }
            req.session.userId = result.insertedId;
            res.status(201).json({ message: 'User registered successfully', userId: result.insertedId.toString() });
        });
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error while creating user' });
    }
};

// Function to upload user profile picture
export const uploadProfilePicture = async (req, res) => {
    try {
        const userId = req.params.userId;
        const db = getDB();
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        // Update user document with profile picture file path
        await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $set: { profilePicture: file.path } }
        );

        res.status(200).json({ message: 'Profile picture uploaded successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while uploading profile picture' });
    }
};

export const retriveDetails = async (req, res) => {
    try {
        const db = getDB();
        const userId = new ObjectId(req.params.userId);

        const user = await db.collection('users').findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const { password, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: 'Server error while retrieving user details' });
    }
};


