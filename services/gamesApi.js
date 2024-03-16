import axios from 'axios'

class GamesApi {
  async getGames() {
    const response = await axios.get('http://localhost:8000/api/Game', {
      headers: {
        Accept: '*/*',
      },
    })

    return response.data
  }
}

export default GamesApi
