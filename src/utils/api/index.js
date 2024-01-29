import { axiosInstance } from "../constant";

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

export async function getListImages({ page, limit }) {
	try {
		const res = await axiosInstance.get(
			`/image/?page=${page}&limit=${limit}`,
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
		const res = await axiosInstance.post('image', formData, {
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

export async function deleteImage(id) {
	try {
		const token = localStorage.getItem('token');
		const res = await axiosInstance.delete(`/admin/image/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return {
			success: true,
			data: res.data,
		};
	} catch (error) {
		console.log(error);
		return {
			success: false,
		};
	}
}

export async function getNews({ page, limit }) {
	try {
		const token = localStorage.getItem('token');
		const res = await axiosInstance.get(
			`/admin/news/?page=${page}&limit=${limit}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
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

export async function deleteNews(id) {
	try {
		const token = localStorage.getItem('token');
		const res = await axiosInstance.delete(
			`/admin/news/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
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

export async function createNews({ title, content, image }) {
	try {
		const token = localStorage.getItem('token');
		const res = await axiosInstance.post(
			"/admin/news/", {
			title,
			content,
			image
		},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
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

export async function getNewsDetail(id) {
	try {
		const token = localStorage.getItem('token');
		const res = await axiosInstance.get(
			`/admin/news/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
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

export async function updateNews({ id, title, content, image }) {
	try {
		const token = localStorage.getItem('token');
		const res = await axiosInstance.put(
			`/admin/news/${id}`,
			{
				title,
				content,
				image
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
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

export async function getListRegistration() {
	try {
		const token = localStorage.getItem('token');
		const res = await axiosInstance.get(
			`/registration/`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
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

export async function getRegistration(id) {
	try {
		const token = localStorage.getItem('token');
		const res = await axiosInstance.get(
			`/registration/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
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

export async function deleteRegistration(id) {
	try {
		const token = localStorage.getItem('token');
		const res = await axiosInstance.delete(
			`/registration/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
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

export async function getListMembers() {
	try {
		const token = localStorage.getItem('token');
		const res = await axiosInstance.get(
			`/admin/members/`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
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

export async function updateMember(id, data) {
	try {
		const token = localStorage.getItem('token');
		const res = await axiosInstance.put(`/admin/members/${id}`, data, {
			headers: {
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
			message: error.response.data.detail || 'Something was wrong!'
		};
	}
}

export async function deleteMember(id) {
	try {
		const token = localStorage.getItem('token');
		const res = await axiosInstance.delete(`/admin/members/${id}`, {
			headers: {
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

export async function getMember(id) {
	try {
		const token = localStorage.getItem('token');
		const res = await axiosInstance.get(`/admin/members/${id}`, {
			headers: {
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

export async function acceptMember(id) {
	try {
		const token = localStorage.getItem('token');
		const res = await axiosInstance.post(`/admin/accept?id=${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return {
			success: true,
			data: res.data,
		};
	} catch (error) {
		console.log(error);
		return {
			success: false,
		};
	}
}