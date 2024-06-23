const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const authService = require('../services/authService');


router.post('/login', async (req, res) => {
    const { email, password, redirectUrl } = req.body;
    const user = await userService.login(email, password);
    const token = await authService.generateUserJWT(user);
  }
);

router.post('/validate', async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await authService.validateToken(token);
      if (decoded) {
        res.status(200).json({ decoded });
      } else {
        res.status(401).json({ message: 'Invalid token' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

router.post('/logout', async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await authService.invalidateToken(token);
      res.status(200).json({ message: 'Token invalidated' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

module.exports = router;
