export default function ({ store, redirect, route }) {
  if (route.path === '/') return

  if (!store.getters.team.prefix) {
    return redirect('/')
  }
}
