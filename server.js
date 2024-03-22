import express from 'express';
import userRoutes from './routes/userRoutes.js';
import { connectDB } from './models/database.js'; 


// Initialise express
const app =  express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// serve static file
app.use(express.static("public"));

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


