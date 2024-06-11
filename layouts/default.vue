<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in navigablePages"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer absolute>
      <v-spacer />
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DefaultLayout',
  data: () => ({
    clipped: true,
    drawer: true,
    items: [
      {
        icon: 'mdi-apps',
        title: 'Welcome',
        to: '/',
      },
      {
        icon: 'mdi-upload',
        title: 'Upload Video',
        to: '/upload-video',
      },
      {
        icon: 'mdi-football',
        title: 'Games',
        to: '/game-list',
      },
    ],
    right: true,
    rightDrawer: false,
    // title: 'Game Vision 2024',
  }),

  computed: {
    ...mapGetters({
      team: 'team', // maps this.team to this.$store.getters.team
    }),

    title() {
      if (!this.team.name) return 'Game Vision 2024'

      return `${this.team.name} - Game Vision 2024`
    },

    navigablePages() {
      if (!this.team.prefix)
        return [
          {
            icon: 'mdi-apps',
            title: 'Welcome',
            to: '/',
          },
        ]

      return this.items
    },
  },
}
</script>
