const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/me', async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res.json(user);
});

module.exports = router;
