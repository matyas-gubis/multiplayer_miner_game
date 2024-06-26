import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:5500',
    },
});
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../public/index.html'));
});

io.on('connection', (socket) => {
    io.emit('log', { message: 'a user connected', color: 'green' });
    console.log('a user connected');
    socket.on('disconnect', () => {
        io.emit('log', { message: 'a user disconnected', color: 'red' });
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});
