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
export default {
  data: () => ({
    games: [
      { id: 1, name: 'vs União', to: '/game-analysis' },
      { id: 2, name: 'at Rex', to: '/game-analysis' },
      { id: 3, name: 'vs Santa Maria', to: '/game-analysis' },
      { id: 4, name: 'at Almirantes', to: '/game-analysis' },
      { id: 5, name: 'vs Pumpkins', to: '/game-analysis' },
    ],
    selectedFile: null,
  }),
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
  },
}
</script>

<style>
</style>