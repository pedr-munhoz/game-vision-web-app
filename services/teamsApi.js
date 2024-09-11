import axios from 'axios'

class TeamsApi {
  async get() {
    const response = await axios.get(`${process.env.API_URL}/api/team/`, {
      headers: {
        Accept: '*/*',
      },
      withCredentials: true,
    })

    return response.data
  }
}

export default TeamsApi
