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
export default {
  data: () => ({
    games: [
      { id: 1, name: 'vs União', to: '/game-analysis' },
      { id: 2, name: 'at Rex', to: '/game-analysis' },
      { id: 3, name: 'vs Santa Maria', to: '/game-analysis' },
      { id: 4, name: 'at Almirantes', to: '/game-analysis' },
      { id: 5, name: 'vs Pumpkins', to: '/game-analysis' },
    ],
  }),
}
</script>

<style>
</style>