const fs = require('fs');

// Blocking, Synchronous File System  -->
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

const textOut = `This is what we know about the avocado ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', `${textOut}`);
console.log('File written!');

// Non-Blocking, Asynchronous File System  -->
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log('There was an error!');

    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);

        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, err => {
                console.log('File has been written!');
            });
        });
    });
});
