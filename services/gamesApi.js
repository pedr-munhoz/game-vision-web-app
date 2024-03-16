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

  async createGame(name) {
    const data = { name }
    const response = await axios.post('http://localhost:8000/api/Game', data, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    })

    return response.data
  }
}

export default GamesApi
