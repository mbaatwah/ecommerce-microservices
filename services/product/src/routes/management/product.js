const { Router } = require('express');
const Product = require('../../models/product');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Product Management' });
});

router.get('/products', async (req, res) => {
    const products = await Product.getProducts();
    res.render('products/index', { title: 'Product Management - Products', products });
});

router.get('/products/create', (req, res) => {
    res.render('products/create', { title: 'Product - New' });
});

router.post('/products', async (req, res) => {
    const { name, description, price, stock } = req.body;
    await Product.createProduct(name, description, +price, +stock);
    res.redirect('/products');
});

router.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.getProductById(id);
    res.render('products/edit', { title: 'Product - ' + product.name, product });
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.getProductById(id);
    res.render('products/view', { title: 'Product - ' + product.name, product });
});

router.patch('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    await Product.updateProduct(id, name, description, +price, +stock);
    res.sendStatus(204);
});

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.deleteProduct(id);
    res.redirect('/products');
});

module.exports = router;