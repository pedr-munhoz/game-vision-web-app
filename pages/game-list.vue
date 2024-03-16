<template>
  <div>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="10">Games</v-col>
          <v-col>
            <game-creator @update="createGame($event)" />
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-list>
          <v-list-item
            v-for="item in games"
            :key="item.id"
            :to="`/game-analysis/${item.id}`"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>mdi-video-outline</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-text="item.name" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
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
import GameCreator from '@/components/GameCreator.vue'
import GamesApi from '@/services/gamesApi'

export default {
  name: 'GamesPage',

  components: {
    GameCreator,
  },

  data: () => ({
    games: [],
    snackbar: false,
    snackbarText: '',
  }),

  created() {
    this.getGames()
  },

  methods: {
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

    createGame(name) {
      const api = new GamesApi()
      api
        .createGame(name)
        .then((data) => {
          this.getGames()
        })
        .catch((error) => {
          this.snackbarText = `Error creating the game: ${error}`
          this.snackbar = true
        })
    },
  },
}
</script>

<style>
</style>