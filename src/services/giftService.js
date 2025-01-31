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
    const endpoint = apiBaseUrl + '/filter?' + query;
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

export async function getUserByCode(code) {
  try {
    const endpoint = `${apiBaseUrl}/getUser/${code.substring(1)}`;
    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    return response.data.profile;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      console.log(status);

      if (status === 404) {
        return null;
      }
    }

    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
}


export async function solicitarVinculo(vinculoData) {
  try {
    const endpoint = `${apiBaseUrl}/solicitar-vinculo`;
    const response = await axios.post(endpoint, vinculoData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          console.error('Erro ao criar vínculo: ID inválido.', error.response.data);
          throw new Error('Erro ao criar vínculo. Verifique os dados enviados.');
        case 409:
          console.error('Vínculo já existente:', error.response.data);
          throw new Error('Este casal já está registrado.');
        case 401:
          console.error('Erro de autenticação: Token inválido ou expirado.', error.response.data);
          throw new Error('Sessão expirada. Faça login novamente.');
        case 500:
          console.error('Erro interno no servidor:', error.response.data);
          throw new Error('Erro no servidor. Tente novamente mais tarde.');
        default:
          console.error('Erro inesperado:', error.response.data);
          throw new Error('Ocorreu um erro ao processar a solicitação.');
      }
    } else if (error.request) {
      console.error('Erro de conexão com o servidor:', error.request);
      throw new Error('Não foi possível conectar ao servidor.');
    } else {
      console.error('Erro inesperado ao vincular casal:', error.message);
      throw new Error('Ocorreu um erro inesperado. Tente novamente.');
    }
  }
}


export async function responderVinculo(status, idCasal) {
  try {
    const endpoint = `${apiBaseUrl}/responder-vinculo/${idCasal}`;
    const response = await axios.post(endpoint, status, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          console.error('Status inválido. Deve ser 1 (aceitar) ou 2 (recusar).', error.response.data);
          throw new Error('Não possivel responder a solicitação. Tente novamente');
        case 404:
          console.error('Couple não encontrado:', error.response.data);
          throw new Error('Solicitação não encontrada');
        case 409:
          console.error('Usuario ja está vinculado ao outro perfil:', error.response.data);
          throw new Error('Usuario ja está vinculado ao outro perfil');
        case 403:
          console.error('Usuário não autorizado a alterar este registro.', error.response.data);
          throw new Error('Sessão expirada. Faça login novamente.');
        case 500:
          console.error('Erro interno no servidor:', error.response.data);
          throw new Error('Erro no servidor. Tente novamente mais tarde.');
        default:
          console.error('Erro inesperado:', error.response.data);
          throw new Error('Ocorreu um erro ao processar a solicitação.');
      }
    } else if (error.request) {
      console.error('Erro de conexão com o servidor:', error.request);
      throw new Error('Não foi possível conectar ao servidor.');
    } else {
      console.error('Erro inesperado ao vincular casal:', error.message);
      throw new Error('Ocorreu um erro inesperado. Tente novamente.');
    }
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

