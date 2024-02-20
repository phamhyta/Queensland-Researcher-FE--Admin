import { axiosInstance } from "../constant";

const token = localStorage.getItem('token');

export async function getAllFeedback(page = 1, limit = 10) {
    try {
        const res = await axiosInstance.get(
            `admin/userSubmission/`,
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

export async function getAllFeedbackMember(page = 1, limit = 10) {
    try {
        const res = await axiosInstance.get(
            `userSubmission/`,
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

export async function createFeedback(data) {
    try {
        const res = await axiosInstance.post(`userSubmission/`, data);
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