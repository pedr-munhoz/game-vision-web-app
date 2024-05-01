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
              v-model="gameId"
              :items="games"
              item-text="name"
              item-value="id"
              outlined
              label="Game"
            ></v-select>
          </v-col>
        </v-row>
        <v-btn :loading="loading" outlined @click="uploadVideo">
          Upload Video
        </v-btn>
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
import PlaysApi from '@/services/playsApi'

export default {
  name: 'VideoUploadPage',

  data: () => ({
    gameId: 0,
    games: [],
    selectedFile: null,
    snackbar: false,
    snackbarText: '',
    loading: false,
  }),

  created() {
    this.getGames()
  },

  methods: {
    handleFileUpload(file) {
      this.selectedFile = file
    },

    uploadVideo() {
      this.loading = true
      const api = new PlaysApi()
      api
        .uploadVideo(this.gameId, this.selectedFile)
        .then((data) => {
          alert('Video uploaded!')
          this.loading = false
        })
        .catch((error) => {
          this.snackbarText = `Error uploading the video: ${error}`
          this.snackbar = true
          this.loading = false
        })
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