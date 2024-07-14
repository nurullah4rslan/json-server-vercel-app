const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const filePath = path.join('db.json');
const router = jsonServer.router(filePath);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// URL yeniden yazma kuralları
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

// Ürün ekleme işlemi
server.post('/products', (req, res) => {
    const db = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const newProduct = req.body;

    newProduct.id = db.products.length + 1; // Otomatik ID oluşturma
    db.products.push(newProduct);

    fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
    res.status(201).jsonp(newProduct);
});

// Ürün silme işlemi
server.delete('/products/:id', (req, res) => {
    const db = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const productId = parseInt(req.params.id, 10);
    const index = db.products.findIndex(product => product.id === productId);

    if (index !== -1) {
        db.products.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// Ürünleri listeleme
server.get('/products', (req, res) => {
    const db = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.jsonp(db.products);
});

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});

// Export the Server API
module.exports = server;
