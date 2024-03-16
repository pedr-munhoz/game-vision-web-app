<template>
  <v-card>
    <v-card-title>Upload Video</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-file-input
            v-model="selectedFile"
            label="Choose a video file"
            accept=".mp4"
            outlined
            @change="handleFileUpload"
          />
        </v-col>
        <v-col cols="6">
          <v-select
            :items="games"
            item-text="name"
            item-value="id"
            outlined
            label="Game"
          ></v-select>
        </v-col>
      </v-row>
      <v-btn outlined @click="uploadVideo">Upload Video</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import GamesApi from '@/services/gamesApi'

export default {
  data: () => ({
    games: [],
    selectedFile: null,
  }),

  created() {
    this.getGames()
  },

  methods: {
    handleFileUpload(file) {
      this.selectedFile = file
    },

    uploadVideo() {
      const formData = new FormData()
      formData.append('video', this.selectedFile)

      // try {
      //   const response = await this.$axios.$post('/api/upload', formData)
      //   console.log('Upload successful', response)
      // } catch (error) {
      //   console.error('Error uploading video', error)
      // }
    },

    getGames() {
      const api = new GamesApi()
      api
        .getGames()
        .then((data) => {
          this.games = data
        })
        .catch((error) => {
          this.games = [{ id: 1, name: error, to: '/' }]
        })
    },
  },
}
</script>

<style>
</style>