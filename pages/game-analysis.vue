<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <iframe
            :src="`https://drive.google.com/file/d/${currentPlayId}/preview`"
            width="540"
            height="360"
            allow="autoplay"
          ></iframe>
          <v-btn outlined><v-icon>mdi-skip-previous</v-icon></v-btn>
          <v-btn outlined><v-icon>mdi-skip-next</v-icon></v-btn>
        </v-card>
      </v-col>
      <v-col></v-col>
      <v-col>
        <v-card>
          <v-data-table :headers="headers" :items="items">
            <template #item.show="{ item }">
              <v-icon icon @click="show(item)"> mdi-play-outline </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-text-field outlined label="Offense"></v-text-field>
      <v-text-field outlined label="Defense"></v-text-field>
      <v-text-field outlined label="Formation"></v-text-field>
      <v-text-field outlined label="Motion"></v-text-field>
      <v-text-field outlined label="Play"></v-text-field>
      <v-text-field outlined label="Result"></v-text-field>
      <v-text-field outlined label="Yards"></v-text-field>
    </v-row>
  </v-container>
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
      { text: 'Formation', value: 'formation' },
      { text: 'Motion', value: 'motion' },
      { text: 'Play', value: 'play' },
      // { text: 'Result', value: 'result' },
      // { text: 'Yards', value: 'yards' },
    ],
    items: [
      {
        id: '1kC7S_HlPGr94CpH1LHyzaxviFk4hO8zF',
        playNumber: '1',
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
        playNumber: '2',
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
        playNumber: '3',
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
        playNumber: '4',
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
        playNumber: '5',
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
        playNumber: '6',
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
        playNumber: '7',
        offense: '...',
        defense: '...',
        formation: '...',
        motion: '...',
        play: '...',
        result: '...',
        yards: '...',
      },
    ],
    currentPlayId: '1kC7S_HlPGr94CpH1LHyzaxviFk4hO8zF',
  }),

  methods: {
    show(item, event) {
      this.currentPlayId = item.id
    },
  },
}
</script>

<style>
</style>