const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Product Management' });
});

module.exports = router;