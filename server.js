import express from 'express';
import userRoutes from './routes/userRoutes.js';
import { connectDB } from './models/database.js';
import session from 'express-session'; 


// Initialise express
const app =  express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// serve static file
app.use(express.static("public"));

//configure express to use express session
app.use(session({
    secret: 'cst2120 secret',  
    resave: false,              
    saveUninitialized: false, 
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

app.use('/api/users', userRoutes);


connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }).catch(err => {
        console.error('An error occurred connecting to MongoDB', err);
        process.exit(1);
});


