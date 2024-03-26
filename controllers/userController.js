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
            req.session.userId = user._id.toString();
            console.log('User logged in successfully. User ID:', req.session.userId);
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

        console.log('Uploaded file:', file); 

        if (!file) {
        return res.status(400).send('No file uploaded.');
        }

        console.log('Uploading file to:', file.path); 

        await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $set: { profilePicture: file.filename } }
        );

        console.log('Profile picture uploaded successfully'); 
        res.status(200).send('Profile picture uploaded successfully.');
    } catch (error) {
        console.error('Error uploading profile picture:', error); 
        res.status(500).send('Server error while uploading profile picture');
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

export const createPost = async (req, res) => {
    try {
        const db = getDB();
        const { postName, description, community } = req.body;

        console.log('Creating post with data:', { postName, description, community });

        if (!postName || !description || !community) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create a new post object
        const post = {
            postName,
            description,
            community,
            createdBy: new ObjectId(req.session.userId),
            createdAt: new Date(),
        };

        // Insert the post into the database
        const result = await db.collection('posts').insertOne(post);

        console.log('Post created successfully with ID:', result.insertedId);
        res.status(201).json({ message: 'Post created successfully', postId: result.insertedId.toString() });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Server error while creating post' });
    }
};

export const uploadPostImage = async (req, res) => {
    try {
        const db = getDB();
        const postId = req.params.postId;
        const imageFile = req.file;

        console.log('Uploading image for post with ID:', postId);

        if (!imageFile) {
            console.log('No image file uploaded');
            return res.status(400).json({ error: 'No image file uploaded' });
        }

        // Update the post with the image URL
        const result = await db.collection('posts').updateOne(
            { _id: new ObjectId(postId) },
            { $set: { image: imageFile.filename } }
        );

        if (result.modifiedCount === 0) {
            console.log('Post not found');
            return res.status(404).json({ error: 'Post not found' });
        }

        console.log('Image uploaded successfully for post with ID:', postId);
        res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error('Error uploading post image:', error);
        res.status(500).json({ error: 'Server error while uploading post image' });
    }
};


export const getFeedPosts = async (req, res) => {
    console.log('getFeedPosts function called');
    try {
        const db = getDB();
        // Convert session userId to ObjectId
        const userId = new ObjectId(req.session.userId);

        console.log('User ID:', userId);

        // Now match using the ObjectId
        const posts = await db.collection('posts')
            .aggregate([
                { $match: { createdBy: userId } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'createdBy',
                        foreignField: '_id',
                        as: 'createdBy'
                    }
                },
                { $unwind: '$createdBy' }
            ])
            .toArray();

        console.log('Retrieved posts:', posts);

        // Ensure the response contains the formatted posts
        const formattedPosts = posts.map(post => ({
            ...post,
            createdBy: post.createdBy.username, 
        }));
        console.log('Formatted posts to send:', formattedPosts);

        res.status(200).json(formattedPosts);
    } catch (error) {
        console.error('Error in getFeedPosts:', error);
        res.status(500).json({ error: 'Server error while retrieving feed posts' });
    }
};



// Function to retrieve posts for a specific community
export const getCommunityPosts = async (req, res) => {
    try {
        const db = getDB();
        const community = req.params.community;

        // Retrieve posts belonging to the specified community
        const posts = await db.collection('posts')
            .aggregate([
                { $match: { community: community } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'createdBy',
                        foreignField: '_id',
                        as: 'createdBy'
                    }
                },
                { $unwind: '$createdBy' }
            ])
            .toArray();

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error while retrieving community posts' });
    }
};


