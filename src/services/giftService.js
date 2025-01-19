import axios from 'axios';

const END_POINT = import.meta.env.WS_URL_API + '/gift';

export async function getAllGifts() {
  try {
    const response = await axios.get(END_POINT+'/gifts', {
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