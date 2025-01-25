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
    const endpoint = apiBaseUrl + '/create-gift';
    const response = await axios.post(endpoint, gift, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    return response;
  } catch (error) {
    console.error("Erro chamada api: ", error);
    return null
  }
}
