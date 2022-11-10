const API_URL = 'api/auth/';

// Login user
export const loginUser = async (userData) => {
	try {
		const res = await fetch(API_URL + 'login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		if (res.ok) {
			const user = await res.json();
			localStorage.setItem('user', JSON.stringify(user));
			return { success: true, data: user };
		} else {
			const err = await res.json();
			return { success: false, data: err };
		}
	} catch (error) {
		return { success: false, data: error };
	}
};

// Sigin up user

export const registerUser = async (userData) => {
	try {
		const res = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		if (res.ok) {
			const newUser = await res.json();
			localStorage.setItem('user', JSON.stringify(newUser));
			return { success: true, data: newUser };
		} else {
			const err = await res.json();
			return { success: false, data: err };
		}
	} catch (error) {
		return { success: false, data: error.response.data };
	}
};
