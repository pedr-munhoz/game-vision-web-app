<template>
  <div>
    <v-card>
      <v-card-title>Upload Videos</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-file-input
              v-model="fileList"
              label="Choose the video files"
              accept=".mp4"
              outlined
              multiple
              @change="handleMultipleFileUpload"
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
        <v-row v-show="loading">
          <v-col>
            Sending... {{ sendCount.done }} / {{ sendCount.total }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn :loading="loading" outlined @click="uploadMultipleVideos">
              Upload Videos
            </v-btn>
          </v-col>
        </v-row>
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
    fileList: [],
    snackbar: false,
    snackbarText: '',
    loading: false,
    sendCount: { total: 0, done: 0 },
  }),

  created() {
    this.getGames()
  },

  methods: {
    handleMultipleFileUpload(files) {
      this.fileList = []
      for (const file of files) {
        this.fileList.push(file)
      }
    },

    uploadVideo(file) {
      const api = new PlaysApi()
      api
        .uploadVideo(this.gameId, file)
        .then((data) => {
          alert('Video uploaded!')
        })
        .catch((error) => {
          this.snackbarText = `Error uploading the video: ${error}`
          this.snackbar = true
        })
    },

    async uploadMultipleVideos() {
      this.loading = true

      this.sendCount.total = this.fileList.length
      this.sendCount.done = 0

      for (const file of this.fileList) {
        try {
          const api = new PlaysApi()
          await api.uploadVideo(this.gameId, file)

          // update UI on success
          this.sendCount.done++
        } catch (error) {
          // handle error
        }
      }

      alert('Videos uploaded!')
      this.loading = false
    },

    getGames() {
      const api = new GamesApi()
      api
        .getAll(this.$store.getters.secret)
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

<style></style>
