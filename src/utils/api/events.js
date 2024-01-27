import { axiosInstance } from "../constant";

const token = localStorage.getItem('token');

export async function getAllEvents(page = 1, limit = 10) {
    try {
        const res = await axiosInstance.get(
            `admin/events/?page=${page}&limit=${limit}`,
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
        const res = await axiosInstance.get(`admin/events/${id}`,
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
        const res = await axiosInstance.post(`admin/events`, data);
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
        const res = await axiosInstance.put(`admin/events/${id}`, data);
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
        const res = await axiosInstance.delete(`admin/events/${id}`);
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