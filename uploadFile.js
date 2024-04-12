const path = require('path');
const express = require('express');
// Multer is used to help handle the upload request sent to S3
const multer = require('multer');
// Required variables for the AWS-SDK, helps with handling the upload request to our S3 server
const AWS = require('aws-sdk');
const uuid = require('uuid');
const { Pool } = require('pg');
// Pulls the Access ID and the Secret ID from our .env file
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const app = express();

// Filter to ensure user is only able to upload files associated with audio content type
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

// This variable tells multer to utilize local/memory storage for the upload request
// Using this makes it so we don't need a folder for the uploaded files to be moved to for multer to parse
const storage = multer.memoryStorage();
// Sets the upload parameters of multer, telling it what storage to use, what filter to use, and the 
// file size limits. All parameters MUST be declared before declaring this variable
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 100 } // This should limit file size of uploads to 100mb
});

// Need to make sure that connectionString is something accurate here?
const pool = new Pool({
    connectionString: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Temp path used for testing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/upload.html'));
});

// POST route for uploading a file to the S3 server
app.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;

    // Generates a unique filename for each upload to prevent duplicates
    const uniqueId = uuid.v4();
    const uniqueName = `${uniqueId}${path.extname(file.originalname)}`
    const params = {
        Bucket: 'enkwbucket',
        Key: uniqueName,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    try {
        // Uploades the file to S3 using the params above
        await s3.upload(params).promise();
        // Saves the file name to our PG db I hope
        const client = await pool.connect();
        const queryText = 'INSERT INTO audio (url) VALUES ($1)';
        const values = [uniqueName];
        await client.query(queryText, values);
        client.release(); // Are this and the .connect needed?

        res.status(200).send('File uploaded to S3 and saved to db successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file');
    }
});

// App listener
app.listen(3001, () => console.log('App is listening...'));