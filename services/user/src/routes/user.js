const userModel = require('../models/user');
const { Router } = require('express');
const bcrypt = require('bcrypt');

const router = Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.getUserById(+id);
        res.status(200).json(user);
    } catch (error) {
        console.log('Error:', error.message);
        res.status(404).json({ message: 'User not found' });
    }
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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.getUserByEmail(email);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials'});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials'});
    }

    return res.json({user, error: null});
});

module.exports = router;