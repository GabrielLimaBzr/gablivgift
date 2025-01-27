import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_BACKEND_URL + '/auth';

export async function loginUser(loginData) {
    try {
        const endpoint = apiBaseUrl + '/login';
        const response = await axios.post(endpoint, loginData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            // Erros com status HTTP retornados pela API
            const status = error.response.status;
            if (status === 400) {
                throw new Error('Login inválido. Verifique suas credenciais.');
            } else if (status === 500) {
                throw new Error('Erro no servidor. Tente novamente mais tarde.');
            }
        } else if (error.request) {
            // Erros relacionados à rede
            throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
        } else {
            // Erros inesperados
            throw new Error('Ocorreu um erro inesperado. Tente novamente.');
        }
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