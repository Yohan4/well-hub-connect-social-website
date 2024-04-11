//userContoller.js
import { getDB } from '../models/database.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';


// function to login
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

// fucntion to logout
export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.clearCookie('connect.sid'); 
        res.json({ message: 'Logged out successfully' });
    });
};

// function to checksession
export const checkSession = (req, res) => {
    if (req.session.userId) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
};

// Function to create a user
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
            following: [], 
            followers: [],
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

// Function to create a post
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

// function to upload a post image
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

// function to get post for feed
export const getFeedPosts = async (req, res) => {
    console.log('getFeedPosts function called');
    try {
        const db = getDB();
        const userId = new ObjectId(req.session.userId);
        console.log('User ID:', userId);

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

        const formattedPosts = posts.map(post => ({
            ...post,
            createdBy: post.createdBy.username, 
            createdById: post.createdBy._id,
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
        const communityName = req.params.community;
        console.log(`Fetching posts for community: '${communityName}'`);

        const posts = await db.collection('posts')
            .aggregate([
                { $match: { community: communityName } },
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

        const formattedPosts = posts.map(post => ({
            ...post,
            createdBy: post.createdBy.username,
        }));

        console.log('Formatted posts for community:', formattedPosts);

        res.status(200).json(formattedPosts);
    } catch (error) {
        console.error('Error in getCommunityPosts:', error);
        res.status(500).json({ error: 'Server error while retrieving community posts' });
    }
};

// Function to get current loggedin user
export const getCurrentUser = async (req, res) => {
    console.log('getCurrentUser function called');
    try {
        const db = getDB();
        const currentUserId = new ObjectId(req.session.userId);
        console.log('Fetching details for user ID:', currentUserId);

        const user = await db.collection('users').findOne({ _id: currentUserId });
        console.log('Retrieved user:', user);

        if (!user) {
            console.error('User not found with ID:', currentUserId);
            return res.status(404).json({ message: 'User not found.' });
        }

        const { password, ...userWithoutPassword } = user;
        console.log('User data to send:', userWithoutPassword);
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error('Error fetching current user:', error);
        res.status(500).json({ error: 'Server error while retrieving current user' });
    }
};

// Function to get suggested users
export const getSuggestedUsers = async (req, res) => {
    try {
        const db = getDB();
        const userId = new ObjectId(req.session.userId);

        // Fetch all users except the logged-in user
        const suggestedUsers = await db.collection('users')
            .find({ _id: { $ne: userId } }) 
            .project({ password: 0 }) 
            .toArray();

        console.log('Suggested users:', suggestedUsers);
        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.error('Error fetching suggested users:', error);
        res.status(500).json({ error: 'Server error while retrieving suggested users' });
    }
};



// Function to follow a user
export const followUser = async (req, res) => {
    try {
        const db = getDB();
        const currentUserId = new ObjectId(req.session.userId);
        const userIdToFollow = new ObjectId(req.params.userId);

        // Update current user's following array
        await db.collection('users').updateOne(
            { _id: currentUserId },
            { $addToSet: { following: userIdToFollow } }
        );

        // Update the followed user's followers array
        await db.collection('users').updateOne(
            { _id: userIdToFollow },
            { $addToSet: { followers: currentUserId } }
        );

        res.status(200).json({ message: 'Now following user' });
    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ error: 'Server error while following user' });
    }
};


// Function to unfollow a user
export const unfollowUser = async (req, res) => {
    try {
        const db = getDB();
        const currentUserId = new ObjectId(req.session.userId);
        const userIdToUnfollow = new ObjectId(req.params.userId);

        // Remove the user from current user's following array
        await db.collection('users').updateOne(
            { _id: currentUserId },
            { $pull: { following: userIdToUnfollow } }
        );

        // Remove the current user from the unfollowed user's followers array 
        await db.collection('users').updateOne(
            { _id: userIdToUnfollow },
            { $pull: { followers: currentUserId } }
        );

        res.status(200).json({ message: 'Unfollowed user successfully' });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ error: 'Server error while unfollowing user' });
    }
};


// Function to get FollwedUsers
export const getFollowedUsers = async (req, res) => {
    try {
        const db = getDB();
        const loggedInUserId = new ObjectId(req.session.userId);

        const user = await db.collection('users').findOne({ _id: loggedInUserId });

        if (!user.following || user.following.length === 0) {
            return res.status(200).json([]);
        }

        const followedUsers = await db.collection('users')
            .find({ _id: { $in: user.following } })
            .toArray();

        res.status(200).json(followedUsers);
    } catch (error) {
        console.error('Error fetching followed users:', error);
        res.status(500).json({ error: 'Server error while retrieving followed users' });
    }
};

// Function to get user post that current user follows
export const getUserPostsByUsername = async (req, res) => {
    try {
        const db = getDB();
        const username = req.params.username;
        const currentUserId = req.session.userId; 

        const targetUser = await db.collection('users').findOne({ username });
        const currentUser = await db.collection('users').findOne({ _id: new ObjectId(currentUserId) });

        if (!targetUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if current user is following the target user
        if (!currentUser.following.includes(targetUser._id.toString())) {
            return res.status(403).json({ error: 'You must be following this user to view their posts' });
        }

        const posts = await db.collection('posts').find({ createdBy: targetUser._id }).toArray();
        const formattedPosts = posts.map(post => ({
            ...post,
            createdBy: username,
        }));

        res.status(200).json(formattedPosts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ error: 'Server error while retrieving user posts' });
    }
};


