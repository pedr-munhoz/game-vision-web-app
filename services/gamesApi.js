import axios from 'axios'

class GamesApi {
  async getAll() {
    const response = await axios.get(`${process.env.API_URL}/api/Game`, {
      headers: {
        Accept: '*/*',
      },
    })

    return response.data
  }

  async get(id) {
    const response = await axios.get(`${process.env.API_URL}/api/Game/${id}`, {
      headers: {
        Accept: '*/*',
      },
    })

    return response.data
  }

  async createGame(name) {
    const data = { name }
    const response = await axios.post(`${process.env.API_URL}/api/Game`, data, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    })

    return response.data
  }
}

export default GamesApi
