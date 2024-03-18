<template>
  <div>
    <v-card class="mx-auto" max-width="1400">
      <v-card-title>{{ game.name }}</v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="6">
              <v-card>
                <v-card-text>
                  <iframe
                    :src="videoUrl"
                    height="360"
                    width="540"
                    allow="autoplay"
                  />
                </v-card-text>

                <v-card-actions>
                  <v-btn outlined @click="previous()">
                    <v-icon>mdi-skip-previous</v-icon>
                  </v-btn>
                  <v-btn outlined @click="next()">
                    <v-icon>mdi-skip-next</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="6">
              <v-card>
                <v-row>
                  <v-col cols="4">
                    <v-text-field outlined label="Offense"></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field outlined label="Defense"></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-select
                      :items="['1st', '2nd', '3rd', '4th']"
                      outlined
                      label="Down"
                    ></v-select>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field outlined label="Distance"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field outlined label="Formation"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field outlined label="Play"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <v-text-field outlined label="Yards"></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-select
                      :items="possibleResults"
                      outlined
                      label="Result"
                    ></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-checkbox outlined label="First Down"></v-checkbox>
                  </v-col>
                  <v-col cols="3">
                    <v-checkbox outlined label="TD"></v-checkbox>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <v-col>
              <v-card>
                <v-data-table dense :headers="headers" :items="items">
                  <template #item.show="{ item }">
                    <v-icon icon @click="show(item)"> mdi-play-outline </v-icon>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
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
  name: 'GameAnalysisPage',

  data: () => ({
    headers: [
      { text: '', value: 'show' },
      { text: '#', value: 'playNumber' },
      { text: 'Offense', value: 'offense' },
      { text: 'Defense', value: 'defense' },
      { text: 'Down', value: 'down' },
      { text: 'Distance', value: 'distance' },
      { text: 'Formation', value: 'formation' },
      { text: 'Name', value: 'name' },
      { text: 'Yards', value: 'yards' },
      { text: 'Result', value: 'result' },
      { text: 'First Down', value: 'firstDown' },
      { text: 'TD', value: 'touchdown' },
      { text: 'Notes', value: 'notes' },
    ],
    items: [],
    currentPlay: {
      id: '',
      fileld: '',
      playNumber: 0,
      offense: '',
      defense: '',
      formation: '',
      motion: '',
      play: '',
      result: '',
      yards: '',
    },
    possibleResults: ['Run', 'Incomplete Pass', 'Complete Pass', 'Sack', 'INT'],
    gameId: 0,
    game: { name: '' },
    snackbar: false,
    snackbarText: '',
  }),

  computed: {
    videoUrl() {
      if (!this.items.length) return ''

      return `https://d1x95g1lk7jxvh.cloudfront.net/${this.gameId}/${this.currentPlay.fileId}`
    },
  },

  created() {
    this.gameId = this.$route.params.id
    this.getGame()
    this.getPlays()
  },

  methods: {
    show(item, event) {
      this.currentPlay = item
    },

    next() {},

    previous() {},

    getGame() {
      const api = new GamesApi()
      api
        .get(this.gameId)
        .then((data) => {
          this.game = data
        })
        .catch((error) => {
          this.snackbarText = `Error fetching the game data: ${error}`
          this.snackbar = true
        })
    },

    getPlays() {
      const api = new PlaysApi()
      api
        .get(this.gameId)
        .then((data) => {
          this.items = data
          if (this.items.length) this.currentPlay = this.items[0]
        })
        .catch((error) => {
          this.snackbarText = `Error listing the plays: ${error}`
          this.snackbar = true
        })
    },
  },
}
</script>

<style>
</style>