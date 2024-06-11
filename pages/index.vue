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
              v-model="teamSecret"
              class="mt-10"
              label="Please inform your team secret"
              outlined
              @keyup.enter="saveTeamSecret()"
            />
            <v-btn outlined @click="saveTeamSecret()">
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

  data: () => ({
    teamSecret: '',
    team: {},
    snackbar: false,
    snackbarText: '',
  }),

  methods: {
    saveTeamSecret() {
      if (!this.teamSecret) {
        this.snackbarText = 'You must inform a secret!'
        this.snackbar = true
        return
      }

      this.$store.dispatch('updateSecret', this.teamSecret)
      this.getTeam()
    },

    getTeam() {
      const api = new TeamsApi()

      api
        .get(this.teamSecret)
        .then((data) => {
          this.team = data
          alert(`Welcome ${this.team.name}!`)
        })
        .catch((error) => {
          this.snackbarText = `Error fetching the team data: ${error}`
          this.snackbar = true
        })
    },
  },
}
</script>
