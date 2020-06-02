// function A() {
//   this.foo = 'hello'
// }
// if (!globalThis._foo) {
//   globalThis._foo = new A()
// }

// module.exports = global._foo
// mod.js
const FOO_KEY = Symbol.for('foo')

function A() {
  this.foo = 'hello'
}

if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A()
}

module.exports = global[FOO_KEY]
