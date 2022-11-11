const API_URL = 'api/feedback/';

//  get all feedback
export const getAllFeedbacks = async () => {
	try {
		const res = await fetch(API_URL, {
			headers: {
				Accept: 'application/json',
			},
		});
		const feedbackList = await res.json();
		return feedbackList;
	} catch (error) {
		console.log('Failure : fetching feedback list', error);
		return error;
	}
};

// create a feedback
export const postFeedback = async (formData) => {
	try {
		const res = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		const newFeedback = await res.json();
		return newFeedback;
	} catch (error) {
		console.log('Failure : create a new feedback ', error);
		return error;
	}
};

//  update a feedback
export const updateFeedback = async (formData, id) => {
	try {
		// const res = await axios.put(API_URL + id, formData);

		const res = await fetch(API_URL + id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		const updatedFeedback = await res.json();
		return updatedFeedback;
	} catch (error) {
		console.log('Failure : update a feedback ', error);
		return error;
	}
};

//  delete a feedback
export const deleteFeedback = async (id) => {
	try {
		const res = await fetch(API_URL + id, { method: 'DELETE' });
		const deletedState = await res.json();
		return deletedState;
	} catch (error) {
		console.log('Failure : delete a feedback ', error);
		return error;
	}
};
