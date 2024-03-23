import express from 'express';
import { config } from 'dotenv';
import pg from 'pg';
import bp from 'body-parser';
import cors from 'cors';

config();
const app = express();
app.use(cors());
const jsonParser = bp.json();

type post = {
    author: string,
    text: string
}

app.get('/', async (req: express.Request, res: express.Response) => {
    console.log('GET');
    const client = new pg.Client();
    await client.connect();
    const response = await client.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.send(response.rows);
    await client.end();
});

app.post('/', jsonParser, async (req: express.Request, res: express.Response) => {
    console.log('POST');
    const client = new pg.Client();
    const request: post = req.body;
    await client.connect();
    const response = await client.query('INSERT INTO posts(created_at, author, text) VALUES (NOW(), $1, $2)', [request.author, request.text]);
    res.send(response.rows);
    await client.end();
});

app.listen(process.env.PORT, () => {
    console.log('Server is up!');
    console.log('Port:',process.env.PORT);
})