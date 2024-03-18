import axios from 'axios'

class PlaysApi {
  async get(gameId) {
    const response = await axios.get(
      `http://localhost:8000/api/play/${gameId}`,
      {
        headers: {
          Accept: '*/*',
        },
      }
    )

    return response.data
  }
}

export default PlaysApi
