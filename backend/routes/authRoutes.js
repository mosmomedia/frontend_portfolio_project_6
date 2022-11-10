const express = require('express');

const router = express.Router();

const { registerUser, loginUser } = require('../controllers/userController');

router
	.route('/')
	.post(registerUser)
	.get((req, res) => {
		res.send('hi');
	});
router.route('/login').post(loginUser);

module.exports = router;
