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
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text>
            <v-form v-model="valid" @submit.prevent="login()">
              <v-container>
                <v-text-field v-model="email" label="Email" outlined />
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  outlined
                />
                <v-btn outlined type="submit">
                  <v-icon>mdi-check-bold</v-icon>
                </v-btn>
              </v-container>
            </v-form>
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
import IdentityApi from '@/services/identityApi'
import TeamsApi from '@/services/teamsApi'

export default {
  name: 'IndexPage',

  middleware: ['auth'],

  data: () => ({
    key: '',
    team: {},
    snackbar: false,
    snackbarText: '',
    email: '',
    password: '',
  }),

  methods: {
    login() {
      const api = new IdentityApi()

      api
        .login(this.email, this.password)
        .then((data) => {
          this.getTeam()
          alert(`Welcome!`)
        })
        .catch((error) => {
          this.snackbarText = `${error}`
          this.snackbar = true
        })
    },

    getTeam() {
      const api = new TeamsApi()

      api
        .get()
        .then((data) => {
          this.$store.dispatch('updateTeam', data)
        })
        .catch((error) => {
          alert(error)
        })
    },
  },
}
</script>
