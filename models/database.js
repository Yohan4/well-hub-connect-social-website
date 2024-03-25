//database.js
import { MongoClient, ServerApiVersion} from 'mongodb';

//Connection details
const password = "zjprvwaptvYZTHSq";
const userName = "Akilesh";
const server =  "cluster0.o0iuy6m.mongodb.net";
const dbName = 'test2';

//Encode special characters
const encodedUsername = encodeURIComponent(userName);
const encodedPassword = encodeURIComponent(password);

//Create connection URI
const connectionURI = `mongodb+srv://${encodedUsername}:${encodedPassword}@${server}/?retryWrites=true&w=majority`;
console.log(connectionURI);


let dbInstance = null;

// Function to connect to the database
export const connectDB = async () => {
    try {
        const client = new MongoClient(connectionURI, {
            serverApi: ServerApiVersion.v1
        });
        await client.connect();
        console.log('Connected to MongoDB');
        dbInstance = client.db(dbName); 
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
        process.exit(1);
    }
};

// Function to get the database instance
export const getDB = () => {
    if (!dbInstance) {
        throw new Error("DB instance has not been initialised. Please call connectDB first.");
    }
    return dbInstance;
};

// getting a specific collection
export const getUsersCollection = () => {
    const db = getDB();
    return db.collection("Users");
};


