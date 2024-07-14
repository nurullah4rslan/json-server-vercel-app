const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Tüm ürünleri listeleyen endpoint
server.get('/products', (req, res) => {
  const db = router.db; // lowdb instance
  const products = db.get('products').value();
  res.json(products);
});

// Kullanıcıya ait boxları listeleyen endpoint
server.get('/boxes', (req, res) => {
  const db = router.db; // lowdb instance
  const boxes = db.get('boxes').value();
  res.json(boxes);
});

// Tüm yorumları listeleyen endpoint
server.get('/comments', (req, res) => {
  const db = router.db; // lowdb instance
  const comments = db.get('comments').value();
  res.json(comments);
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
