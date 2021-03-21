const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

// HTML TEMPLATE
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

// READING JSON
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// This only shows us how slugify works.
// const slugs = dataObj.map(element => slugify(element.productName, { lower: true }));
// console.log(slugs);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // OVERVIEW ROUTE
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(400, { 'Content-type': 'text/html' });

        const cardHtml = dataObj
            .map(data => {
                return replaceTemplate(tempCard, data);
            })
            .join('');
        const overview = tempOverview.replace('{% PRODUCT_CARDS %}', cardHtml);
        res.end(overview);

        // PRODUCT ROUTE
    } else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        return res.end(output);

        // API ROUTE
    } else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(`${data}`);

        // NOT FOUND ROUTE
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
