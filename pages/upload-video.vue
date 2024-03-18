<template>
  <div>
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

    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template #actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import GamesApi from '@/services/gamesApi'

export default {
  name: 'VideoUploadPage',

  data: () => ({
    games: [],
    selectedFile: null,
    snackbar: false,
    snackbarText: '',
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
        .getAll()
        .then((data) => {
          this.games = data
        })
        .catch((error) => {
          this.snackbarText = `Error listing the games: ${error}`
          this.snackbar = true
        })
    },
  },
}
</script>

<style>
</style>