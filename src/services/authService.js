import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_BACKEND_URL + '/auth';

export async function loginUser(loginData) {
    try {
        const endpoint = apiBaseUrl + '/login';
        const response = await axios.post(endpoint, loginData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error("Erro chamada api: ", error);
        return null
    }
}

export async function registerUser(registerData) {
    try {
        const endpoint = apiBaseUrl + '/register';
        const response = await axios.post(endpoint, registerData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error("Erro chamada api: ", error);
        return null
    }
}