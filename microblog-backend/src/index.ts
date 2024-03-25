//Importing npm packages using ES6 syntax.
import express from 'express';
import { config } from 'dotenv';
import pg from 'pg';
import bp from 'body-parser';
import cors from 'cors';

//Get environmental variables from .env file.
config();

/* Setting up Express service. The service must use CORS as middleware in order to use the same
origin for both server and client (Both are located in http://localhost in this example). */
const app = express();
app.use(cors());

// Setting up JSON parser in order to use the parameters sent in POST body content.
const jsonParser = bp.json();

// TypeScript type defining POST body content.
type post = {
    author: string,
    text: string
}

// GET endpoint defined here.
app.get('/', async (req: express.Request, res: express.Response) => {
    console.log('GET');
    
    // Postgres client created and connected here.
    const client = new pg.Client();
    await client.connect();

    // Running SELECT query in our database in order to get its full content.
    const response = await client.query('SELECT * FROM posts ORDER BY created_at DESC');

    // Sending obtained content to response object in order to be shown as request result.
    res.send(response.rows);

    // Closing Postgres client.
    await client.end();
});

app.post('/', jsonParser, async (req: express.Request, res: express.Response) => {
    console.log('POST');

    // Postgres client created here.
    const client = new pg.Client();
    
    //Request body must have "post" type in order to ensure proper compilation.
    const request: post = req.body;

    // Connecting client.
    await client.connect();

    /* Running INSERT query in our database in order to create a new row containing id, timestamp,
    author and text. Id is created automatically by Postgres because it's a serial primary key.
    created_at receives current timestamp by SQL function NOW(). Author and text parameters are inserted
    as parameters for $1 and $2 variables. Returns what was created. */
    const response = await client.query('INSERT INTO posts(created_at, author, text) VALUES (NOW(), $1, $2) RETURNING *', [request.author, request.text]);

    // Sending created row as response.
    res.send(response.rows);

    // Closing Postgres client.
    await client.end();
});

// Setting up Express server in port defined in .env. We are able to listen to API calls right now.
app.listen(process.env.PORT, () => {
    console.log('Server is up!');
    console.log('Port:',process.env.PORT);
})
