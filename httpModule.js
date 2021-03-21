const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    return res.end('Hello from the server');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000...');
});
