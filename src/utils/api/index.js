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


// images
export async function getListImages({page, limit}) {
    try {
		const res = await axiosInstance.get(
			`uploadImage/get_images?page=${page}&limit=${limit}`,
		);
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



export async function uploadImage(file) {
	try {
        const token = localStorage.getItem('token');
		const formData = new FormData();
		formData.append('files', file);
		const res = await axiosInstance.post('uploadImage/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return {
			success: true,
			data: res.data,
		};
	} catch (error) {
		return {
			success: false,
		};
	}
}


