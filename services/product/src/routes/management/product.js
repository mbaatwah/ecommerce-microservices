const { Router } = require('express');
const Product = require('../../models/product');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Product Management' });
});

router.get('/products', async (req, res) => {
    const products = await Product.getProducts();
    res.render('products', { title: 'Product Management - Products', products });
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.getProductById(id);
    res.render('product', { title: 'Product - ' + product.name, product });
});

router.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.getProductById(id);
    res.render('product-edit', { title: 'Product - ' + product.name, product });
});

router.patch('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    await Product.updateProduct(id, name, description, price, quantity);
    res.redirect('/products/' + id);
});

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.deleteProduct(id);
    res.redirect('/products');
});

module.exports = router;