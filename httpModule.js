const fs = require('fs');
const http = require('http');
const url = require('url');

// HTML TEMPLATE
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

// READING JSON
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// REPLACE TEMPLATE
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{% PRODUCTNAME %}/g, product.productName);
    output = output.replace(/{% IMAGE %}/g, product.image);
    output = output.replace(/{% PRICE %}/g, product.price);
    output = output.replace(/{% FROM %}/g, product.from);
    output = output.replace(/{% NUTRIENTS %}/g, product.nutrients);
    output = output.replace(/{% QUANTITY %}/g, product.quantity);
    output = output.replace(/{% DESCRIPTION %}/g, product.description);
    output = output.replace(/{% ID %}/g, product.id);

    if (!product.organic) output = output.replace(/{% NOT_ORGANIC %}/g, 'not-organic');
    return output;
};

const server = http.createServer((req, res) => {
    const pathName = req.url;

    // OVERVIEW ROUTE
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(400, { 'Content-type': 'text/html' });

        const cardHtml = dataObj
            .map(data => {
                return replaceTemplate(tempCard, data);
            })
            .join('');
        const overview = tempOverview.replace('{% PRODUCT_CARDS %}', cardHtml);
        res.end(overview);

        // PRODUCT ROUTE
    } else if (pathName === '/product') {
        return res.end('This is the PRODUCT page');

        // API ROUTE
    } else if (pathName === '/api') {
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
