const express = require('express');

const router = express.Router();

const {
	getAllfeedbacks,
	postFeedback,
	deleteFeedback,
	updateFeedback,
} = require('../controllers/feedbackController');

router.route('/').get(getAllfeedbacks).post(postFeedback);
router.route('/:id').put(updateFeedback).delete(deleteFeedback);

module.exports = router;
