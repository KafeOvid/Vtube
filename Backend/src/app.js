// Import required modules
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Create an Express application
const app = express();

// Enable CORS with specific origin and credentials support
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow cookies and credentials to be sent
}));

// Parse incoming JSON requests with a size limit
app.use(express.json({
    limit: '50kb', // Limit JSON payload size to 50kb
}));

// Parse URL-encoded data with a size limit
app.use(express.urlencoded({
    extended: true, // Support rich objects and arrays
    limit: '50kb',  // Limit URL-encoded payload size to 50kb
}));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse cookies attached to the client request object
app.use(cookieParser());

// Export the configured Express app
export default app;