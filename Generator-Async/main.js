function* gen(x) {
  var y = yield x + 2
  var y2 = yield x + 3
  return y2
}

var g = gen(1)
console.log(g.next()) // { value: 3, done: false }
console.log(g.next())
console.log(g.next(2))
var x = 1

function f(m) {
  return m * 2
}

console.log(f(x + 5))
