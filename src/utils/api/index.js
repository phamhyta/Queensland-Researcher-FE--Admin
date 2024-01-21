import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: "https://api.avesq.org",
	headers: {
		accept: 'application/json',
	},
});

export async function login({ email, password }) {
	try {
		const res = await axiosInstance.post('/auth/login', {
			email,
			password,
		});
		return {
			success: true,
			data: res.data,
		};
	} catch (error) {
		console.log(error);
		return {
			success: false,
			msg: error.response?.data.detail || 'Something was wrong!',
		};
	}
}





