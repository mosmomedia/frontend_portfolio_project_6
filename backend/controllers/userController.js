const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   /api/users
// @access  Public

const registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		// Validation
		if (!name || !email || !password) {
			res.status(400);
			throw new Error('Please include all fields');
		}

		// Find if user already exists
		const userExists = await User.findOne({ email });

		if (userExists) {
			res.status(400);
			throw new Error('유저가 이미 존재합니다.');
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create user
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		if (!user) {
			res.status(400);
			throw new Error('유효한 유저 정보가 아닙니다.');
		}

		// Generate token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '30d',
		});

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token,
		});
	} catch (error) {
		res.json(error.message);
	}
};

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			res.status(401);
			throw new Error('아이디를 확인하세요.');
		}

		// Check user and passwords match
		const checkPw = await bcrypt.compare(password, user.password);

		if (!checkPw) {
			res.status(401);
			throw new Error('비밀번호를 확인하세요.');
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '30d',
		});

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token,
		});
	} catch (error) {
		res.json(error.message);
	}
};

module.exports = {
	registerUser,
	loginUser,
};
