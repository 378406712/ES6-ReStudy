// globalThis._foo = { foo: 'world' }

global[Symbol.for('foo')] = { foo: 'world' }
const a = require('./mod.js')
console.log(a.foo)
