import express from 'express';
import api from './routes/api.js';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json());
server.use(api);

server.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});
