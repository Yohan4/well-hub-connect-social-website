import express from 'express';
import userRoutes from './routes/userRoutes.js';
import { connectDB, connectionURI } from './models/database.js';
import session from 'express-session';
import MongoStore from 'connect-mongo'

// Initialise express
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static("public"));

// Configure express to use express session
app.use(session({
    secret: 'cst2120 secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: connectionURI 
    }),
    cookie: {
        maxAge: 600000
    }
}));

// Middleware to initialize the session
app.use((req, res, next) => {
    if (!req.session) {
        req.session = {};
    }
    next();
});

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// app.get('/api/users/current', (req, res) => {
//     console.log('Simplified route /api/users/current was hit');
//     res.json({ message: 'Simplified route reached successfully' });
// });

app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('An error occurred connecting to MongoDB', err);
        process.exit(1);
    });