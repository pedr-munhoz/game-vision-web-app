<template>
  <div>
    <v-card class="mx-auto" dense>
      <v-container fluid>
        <v-row dense>
          <v-col cols="7">
            <v-card>
              <v-card-text>
                <iframe
                  :src="videoUrl"
                  height="360"
                  width="540"
                  allow="autoplay"
                  allowfullscreen
                />
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="5">
            <v-card>
              <v-card-title>Filter</v-card-title>
              <v-card-text>
                <v-select
                  v-model="filter1.prop"
                  :items="tableHeaders"
                  label="Column"
                  item-text="text"
                  item-value="value"
                  outlined
                  @change="filter1.value = ''"
                />
                <v-text-field v-model="filter1.value" label="Value" outlined />
              </v-card-text>
            </v-card>
          </v-col>

          <v-col>
            <v-card>
              <v-data-table
                dense
                multi-sort
                :headers="tableHeaders"
                :items="plays"
                :custom-filter="filterByColumn"
                :search="filter1.value"
              >
                <template #body="{ items, headers }">
                  <tbody>
                    <tr v-for="(item, idx) in items" :key="idx">
                      <td v-for="(header, key) in headers" :key="key">
                        <v-icon
                          v-if="header.value == 'show'"
                          icon
                          @click="show(item)"
                        >
                          mdi-play-outline
                        </v-icon>
                        <v-edit-dialog
                          v-if="
                            header.editable == 'text' ||
                            header.editable == 'number'
                          "
                          :return-value.sync="item[header.value]"
                          persistent
                          @save="save()"
                          @cancel="cancel()"
                          @open="open(item)"
                          @close="save()"
                        >
                          {{ item[header.value] }}
                          <template #input>
                            <v-text-field
                              v-if="header.editable == 'text'"
                              v-model="item[header.value]"
                              label="Edit"
                              single-line
                            />
                            <v-text-field
                              v-if="header.editable == 'number'"
                              v-model="item[header.value]"
                              label="Edit"
                              single-line
                              type="number"
                            />
                          </template>
                        </v-edit-dialog>
                        <v-checkbox
                          v-if="header.editable == 'bool'"
                          v-model="item[header.value ?? false]"
                          @click="
                            open(item)
                            save()
                          "
                        />
                      </td>
                    </tr>
                  </tbody>
                </template>
                <template #item.show="{ item }">
                  <v-icon icon @click="show(item)"> mdi-play-outline </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
    tableHeaders: [
      { text: '', value: 'show', editable: null },
      { text: '#', value: 'playNumber', editable: null },
      { text: 'Offense', value: 'offense', editable: 'text' },
      { text: 'Defense', value: 'defense', editable: 'text' },
      { text: 'Down', value: 'down', editable: 'number' },
      { text: 'Distance', value: 'distance', editable: 'number' },
      { text: 'Goal', value: 'goal', editable: 'text' },
      { text: 'Situation', value: 'situation', editable: 'text' },
      { text: 'Yards', value: 'yards', editable: 'number' },
      { text: 'Off Form', value: 'offensiveFormation', editable: 'text' },
      { text: 'Off Play', value: 'offensivePlay', editable: 'text' },
      { text: 'Def Form', value: 'defensiveFormation', editable: 'text' },
      { text: 'Def Play', value: 'defensivePlay', editable: 'text' },
      { text: 'Result', value: 'result', editable: 'text' },
      { text: 'Penalty', value: 'penalty', editable: 'text' },
      { text: 'First Down', value: 'firstDown', editable: 'bool' },
      { text: 'Touchdown', value: 'touchdown', editable: 'bool' },
      { text: 'Safety', value: 'safety', editable: 'bool' },
      { text: 'Runner', value: 'runner', editable: 'text' },
      { text: 'Passer', value: 'passer', editable: 'text' },
      { text: 'Target', value: 'target', editable: 'text' },
      { text: 'Target Position', value: 'targetPosition', editable: 'text' },
      { text: 'Defensive Target', value: 'defensiveTarget', editable: 'text' },
      { text: 'Tackler', value: 'tackler', editable: 'text' },
      { text: 'Interceptor', value: 'interceptor', editable: 'text' },
      { text: 'Off Notes', value: 'ofensiveNotes', editable: 'text' },
      { text: 'Def Notes', value: 'defensiveNotes', editable: 'text' },
    ],

    plays: [],
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
    search: '',
    filter1: { prop: '', value: '' },
  }),

  computed: {
    videoUrl() {
      if (!this.plays.length) return ''

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
          this.plays = data
          if (this.plays.length) this.currentPlay = this.plays[0]
        })
        .catch((error) => {
          this.snackbarText = `Error listing the plays: ${error}`
          this.snackbar = true
        })
    },

    save() {
      const api = new PlaysApi()
      api
        .update(this.currentPlay.id, this.currentPlay)
        .then((data) => {})
        .catch((error) => {
          this.snackbarText = `Error updating a play: ${error}`
          this.snackbar = true
        })
    },

    cancel() {},

    open(item) {
      this.currentPlay = item
    },

    close() {},

    filterByColumn(value, query, item) {
      // const parts = query.split('=') // Split the query into parts based on '='

      // const column = parts[0]
      // const filter = parts[1]

      const column = this.filter1.prop
      const filter = this.filter1.value

      return (
        // !query.toString().includes('=') ||
        filter != null &&
        item[column] != null &&
        item[column].toString().toLocaleLowerCase().includes(filter)
      )
    },
  },
}
</script>

<style>
</style>