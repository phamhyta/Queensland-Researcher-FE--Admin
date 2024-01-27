import axios from 'axios';
const token = localStorage.getItem('token');
export const axiosInstance = axios.create({
	baseURL: "https://api.avesq.org/admin",
	headers: {
		accept: 'application/json',
        Authorization: `Bearer ${token}`,
	},
});

export async function getAllEvents(page = 1, LIMIT = 10) {
	try {
        const res = await axiosInstance.get(
			`/events/?page=${page}&limit=${LIMIT}`,
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
            message: error.response.data.detail || 'Something was wrong!'
		};
	}
}

export async function getEventById(id) {
    try {
        const res = await axiosInstance.get(`/events/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        
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

export async function createEvent(data) {
    try {
        const res = await axiosInstance.post(`/events`, data);
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

export async function updateEvent(id, data) {
    try {
        const res = await axiosInstance.put(`/events/${id}`, data);
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

export async function deleteEvent(id) {
    try {
        const res = await axiosInstance.delete(`/events/${id}`);
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