import axios from 'axios'

class GamesApi {
  async getAll(teamPrefix) {
    const response = await axios.get(
      `${process.env.API_URL}/api/team/${teamPrefix}/game`,
      {
        headers: {
          Accept: '*/*',
        },
      }
    )

    return response.data
  }

  async get(id) {
    const response = await axios.get(`${process.env.API_URL}/api/game/${id}`, {
      headers: {
        Accept: '*/*',
      },
    })

    return response.data
  }

  async createGame(name, teamPrefix) {
    const data = { name }
    const response = await axios.post(
      `${process.env.API_URL}/api/team/${teamPrefix}/game`,
      data,
      {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data
  }
}

export default GamesApi
