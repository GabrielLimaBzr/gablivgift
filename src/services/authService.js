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

export async function verifyEmail(token) {
    try {
        const endpoint = apiBaseUrl + `/verify-email?token=${token}`;
        const response = await axios.get(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    } catch (error) {
        console.error("Erro chamada api: ", error);
        return error.response
    }
}

export async function recoverPassword(registerData) {
    try {
        const endpoint = apiBaseUrl + '/recover-password';
        const response = await axios.post(endpoint, registerData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    } catch (error) {
        return null;
    }
}

export async function resetPass(registerData) {
    try {        
        const endpoint = apiBaseUrl + '/reset-password';
        const response = await axios.post(endpoint, registerData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    } catch (error) {
        return null;
    }
}