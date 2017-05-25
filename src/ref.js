export default function ref(component, name) {
  return (el) => {
    component[name] = el
  }
}
