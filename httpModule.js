const fs = require('fs');
const http = require('http');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        return res.end('This is the OVERVIEW page');
    } else if (pathName === '/product') {
        return res.end('This is the PRODUCT page');
    } else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(`${data}`);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        return res.end('<h1>404 This page does not exist</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000...');
});
