import { axiosInstance } from "../constant";

const token = localStorage.getItem('token');

export async function getAllContacts(page = 1, limit = 10) {
    try {
        const res = await axiosInstance.get(
            `/admin/contact/?page=${page}&limit=${limit}`,
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

export async function getContactById(id) {
    try {
        const res = await axiosInstance.get(
            `/admin/contact/${id}`,
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

export async function deleteContact(id) {
    try {
        const res = await axiosInstance.delete(
            `/admin/contact/${id}`,
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