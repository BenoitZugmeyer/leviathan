export default function bound(component, name) {
  return (...args) => component[name](...args)
}
