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

  async uploadVideo(gameId, videoFile) {
    const formData = new FormData()
    formData.append('video', videoFile, videoFile.name)

    const response = await axios.post(
      `http://localhost:8000/api/Play/${gameId}`,
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
      `http://localhost:8000/api/Play/${playId}`,
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
