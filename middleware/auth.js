export default function ({ store, redirect, route }) {
  if (route.path === '/') return

  if (!store.getters.isLoggedIn) {
    return redirect('/')
  }
}
