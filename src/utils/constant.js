import axios from 'axios';
const token = localStorage.getItem('token');

export const axiosInstance = axios.create({
	baseURL: "https://api.avesq.org",
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${token}`,
	},
});

export const LIMIT = 10;
export const defaultURLImage = 'https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg';
export const defaultPassWord = 'avesq2024'