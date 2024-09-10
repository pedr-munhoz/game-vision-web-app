import axios from 'axios'

class IdentityApi {
  async login(email, password) {
    const data = { email, password }
    const response = await axios.post(
      `${process.env.API_URL}/login?useCookies=true`,
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

export default IdentityApi
