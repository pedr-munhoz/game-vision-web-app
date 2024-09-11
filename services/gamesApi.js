import axios from 'axios'

class GamesApi {
  async getAll() {
    const response = await axios.get(`${process.env.API_URL}/api/team/game`, {
      headers: {
        Accept: '*/*',
      },
      withCredentials: true,
    })

    return response.data
  }

  async get(id) {
    const response = await axios.get(`${process.env.API_URL}/api/game/${id}`, {
      headers: {
        Accept: '*/*',
      },
      withCredentials: true,
    })

    return response.data
  }

  async createGame(name) {
    const data = { name }
    const response = await axios.post(
      `${process.env.API_URL}/api/team/game`,
      data,
      {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )

    return response.data
  }
}

export default GamesApi
