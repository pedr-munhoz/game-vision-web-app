<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="logo py-4 d-flex justify-center">
          <NuxtLogo />
          <VuetifyLogo />
        </v-card>
        <v-card>
          <v-card-title class="headline">
            Welcome to the Game Vision plataform!
          </v-card-title>
          <v-card-text>
            <p>
              Game Vision is a video analysis plataform for football and flag
              football. It was designed to empower teams and athletes to take
              the game to the next level.
            </p>
            <div class="text-xs-right">
              <em><small>&mdash; Pedro Munhoz</small></em>
            </div>
            <hr class="my-3" />

            <v-text-field
              v-model="key"
              class="mt-10"
              label="Please inform your team key"
              outlined
              @keyup.enter="savekey()"
            />
            <v-btn outlined @click="savekey()">
              <v-icon>mdi-check-bold</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

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
import TeamsApi from '@/services/teamsApi'

export default {
  name: 'IndexPage',

  middleware: ['auth'],

  data: () => ({
    key: '',
    team: {},
    snackbar: false,
    snackbarText: '',
  }),

  methods: {
    savekey() {
      if (!this.key) {
        this.snackbarText = 'You must inform a secret!'
        this.snackbar = true
        return
      }

      this.getTeam()
    },

    getTeam() {
      const api = new TeamsApi()

      api
        .get(this.key)
        .then((data) => {
          this.$store.dispatch('updateTeam', data)
          alert(`Welcome ${data.name}!`)
        })
        .catch((error) => {
          this.snackbarText = `Error fetching the team data: ${error}`
          this.snackbar = true
        })
    },
  },
}
</script>
