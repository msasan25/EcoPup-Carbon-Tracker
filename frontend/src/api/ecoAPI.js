import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const analyzeActivity = async (token, payload) => {
    const res = await axios.post(
        `${BASE_URL}/analyze`,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return res.data;
};