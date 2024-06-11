import axios from 'axios'

class TeamsApi {
  async get(secret) {
    const response = await axios.get(
      `${process.env.API_URL}/api/team/${secret}`,
      {
        headers: {
          Accept: '*/*',
        },
      }
    )

    return response.data
  }
}

export default TeamsApi
