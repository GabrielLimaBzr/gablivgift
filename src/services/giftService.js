import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_BACKEND_URL + '/gift';

export async function getAllGifts() {
  try {
    const endpoint = apiBaseUrl + '/gifts';
    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    return response.data.gifts;
  } catch (error) {
    console.error("Erro chamada api: ", error);
    return null
  }
}

export async function getGiftByFilter(query) {
  try {
    const endpoint = apiBaseUrl + '/filter?'+ query;
    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Erro chamada api: ", error);
    return null
  }
}

export async function uploadImageGift(formData) {
  try {
    const endpoint = apiBaseUrl + '/upload';
    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    return response.data.url;

  } catch (error) {
    console.error("Erro chamada api: ", error);
    return null
  }
}

export async function createGift(gift) {
  try {
      const endpoint = `${apiBaseUrl}/create-gift`;
      const response = await axios.post(endpoint, gift, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
      });
      return response;
  } catch (error) {
      if (error.response) {
          // Tratamento de erros retornados pela API
          const status = error.response.status;

          if (status === 400) {
              console.error('Erro ao criar presente: Dados inválidos.', error.response.data);
              throw new Error('Erro ao criar presente. Verifique os dados enviados.');
          } else if (status === 401) {
              console.error('Erro de autenticação: Token inválido ou expirado.', error.response.data);
              throw new Error('Sessão expirada. Faça login novamente.');
          } else if (status === 500) {
              console.error('Erro interno no servidor:', error.response.data);
              throw new Error('Erro no servidor. Tente novamente mais tarde.');
          }
      } else if (error.request) {
          // Erro relacionado à ausência de resposta da API
          console.error('Erro de conexão com o servidor:', error.request);
          throw new Error('Não foi possível conectar ao servidor.');
      } else {
          // Outros erros inesperados
          console.error('Erro inesperado ao criar presente:', error.message);
          throw new Error('Ocorreu um erro inesperado. Tente novamente.');
      }
  }
}

