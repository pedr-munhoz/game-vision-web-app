import axios from 'axios'

class PlaysApi {
  async get(gameId) {
    const response = await axios.get(
      `${process.env.API_URL}/api/play/game/${gameId}`,
      {
        headers: {
          Accept: '*/*',
        },
      }
    )

    return response.data
  }

  async uploadVideo(gameId, videoFile) {
    const formData = new FormData()
    formData.append('video', videoFile, videoFile.name)

    const response = await axios.post(
      `${process.env.API_URL}/api/play/game/${gameId}`,
      formData,
      {
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return response.data
  }

  async update(playId, data) {
    const response = await axios.put(
      `${process.env.API_URL}/api/play/${playId}`,
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

export default PlaysApi
