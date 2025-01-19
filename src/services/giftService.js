import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_BACKEND_URL + '/gift';

export async function getAllGifts() {
  try {
    const endpoint = apiBaseUrl+'/gifts';
    console.log("END_POINT: ", endpoint);
    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    
    console.log("response: ", response.data);
    return response.data.gifts;
  } catch (error) {
    console.error("Erro chamada api: ", error);
    return null
  }
}