<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="10">Games</v-col>
        <v-col>
          <v-btn outlined>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
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
</template>

<script>
import GamesApi from '@/services/gamesApi'

export default {
  name: 'GamesPage',

  data: () => ({
    games: [],
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
  },
}
</script>

<style>
</style>