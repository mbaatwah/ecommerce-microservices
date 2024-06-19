const userModel = require('../models/user');
const { Router } = require('express');

const router = Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await userModel.getUserById(id);
    res.json(user);
});

router.post('/', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await userModel.createUser(firstName, lastName, email, password);
    res.json(user);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;
    const user = await userModel.updateUser(id, firstName, lastName, email, password);
    res.json(user);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await userModel.deleteUser(id);
    res.json(user);
});

module.exports = router;