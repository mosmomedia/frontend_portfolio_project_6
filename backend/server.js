const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config({ path: './dev.env' });
connectDB();

const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/auth', require('./routes/authRoutes.js'));

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, '../dist')));
	app.get('*', (_, res) => {
		res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
	});
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
