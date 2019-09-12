export default function({ store, redireact }) {
  if (store.state.auto) {
    return redireact('/home')
  }
}
