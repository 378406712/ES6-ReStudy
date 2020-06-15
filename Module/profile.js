var foo = 'bar'
setTimeout(() => (foo = 'baz'), 500)

function multiply(x, y) {
  return x * y
}
function aliass() {
  console.log('alias')
}
export { foo, multiply,aliass as baz }
