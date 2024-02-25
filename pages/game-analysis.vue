<template>
  <v-card class="mx-auto" max-width="1400">
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <v-card>
            <v-card-text>
              <iframe
                :src="`https://drive.google.com/file/d/${currentPlay.id}/preview`"
                height="360"
                width="540"
                allow="autoplay"
              ></iframe>
            </v-card-text>
            <v-card-actions>
              <v-btn outlined @click="previous()"
                ><v-icon>mdi-skip-previous</v-icon></v-btn
              >
              <v-btn outlined @click="next()"
                ><v-icon>mdi-skip-next</v-icon></v-btn
              >
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
  </v-card>
</template>

<script>
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
      { text: 'Play', value: 'play' },
      { text: 'Yards', value: 'yards' },
      { text: 'Result', value: 'result' },
      { text: 'First Down', value: 'firstDown' },
      { text: 'TD', value: 'td' },
    ],
    items: [
      {
        id: '1kC7S_HlPGr94CpH1LHyzaxviFk4hO8zF',
        playNumber: 1,
        offense: '...',
        defense: '...',
        formation: '...',
        motion: '...',
        play: '...',
        result: '...',
        yards: '...',
      },
      {
        id: '1ZVavEoVP1YMburYaQyW3rNVE3VAPjyEm',
        playNumber: 2,
        offense: '...',
        defense: '...',
        formation: '...',
        motion: '...',
        play: '...',
        result: '...',
        yards: '...',
      },
      {
        id: '1EP000A2_O5-3NtGGym-3_Tugl0jqE8l8',
        playNumber: 3,
        offense: '...',
        defense: '...',
        formation: '...',
        motion: '...',
        play: '...',
        result: '...',
        yards: '...',
      },
      {
        id: '1xaJ581-JYfOIxrnyBEf_r5oRcW2FT7L7',
        playNumber: 4,
        offense: '...',
        defense: '...',
        formation: '...',
        motion: '...',
        play: '...',
        result: '...',
        yards: '...',
      },
      {
        id: '1heMoM2A4K6iVOSFFmhtRwXb_gTJqcQiE',
        playNumber: 5,
        offense: '...',
        defense: '...',
        formation: '...',
        motion: '...',
        play: '...',
        result: '...',
        yards: '...',
      },
      {
        id: '1-8aZtHGcgNeAOJX4P51ITnTncprJPK7K',
        playNumber: 6,
        offense: '...',
        defense: '...',
        formation: '...',
        motion: '...',
        play: '...',
        result: '...',
        yards: '...',
      },
      {
        id: '12Td2kNupA82rs9zCPVuqCi39PI4yAYlP',
        playNumber: 7,
        offense: '...',
        defense: '...',
        formation: '...',
        motion: '...',
        play: '...',
        result: '...',
        yards: '...',
      },
    ],
    currentPlay: {
      id: '1kC7S_HlPGr94CpH1LHyzaxviFk4hO8zF',
      playNumber: 1,
      offense: '...',
      defense: '...',
      formation: '...',
      motion: '...',
      play: '...',
      result: '...',
      yards: '...',
    },
    possibleResults: ['Run', 'Incomplete Pass', 'Complete Pass', 'Sack', 'INT'],
  }),

  methods: {
    show(item, event) {
      this.currentPlay = item
    },
    next() {
      const nextPlay = this.items.find(
        (x) => x.playNumber === this.currentPlay.playNumber + 1
      )
      if (nextPlay) this.currentPlay = nextPlay
    },
    previous() {
      const previousPlay = this.items.find(
        (x) => x.playNumber === this.currentPlay.playNumber - 1
      )
      if (previousPlay) this.currentPlay = previousPlay
    },
  },
}
</script>

<style>
</style>