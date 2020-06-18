// function* helloWorldGenerator() {
//   yield 'hello'
//   yield 'world'
//   return 'ending'
// }

// var hw = helloWorldGenerator()
// console.log(hw.next())
// console.log(hw.next())
// console.log(hw.next())
// console.log(hw.next())

// function* gen() {
//   yield 123 + 456
// }

// let genra = gen()
// console.log(genra.next())

// function* f() {
//   console.log('执行了！')
// }

// var generator = f()

// setTimeout(function () {
//   generator.next()
// }, 2000)

// const arr = [1, [[2, 3], 4], [5, 6]]

// const flat = function* (a) {
//   const len = a.length
//   for (let i = 0; i < len; i++) {
//     const item = a[i]
//     if (typeof item !== 'number') {
//       yield* flat(item)
//     } else {
//       yield item
//     }
//   }
// }
// for (let f of flat(arr)) {
//   console.log(f)
// }
// const myIterable = {}
// myIterable[Symbol.iterator] = function* () {
//   yield 1
//   yield 2
//   yield 3
// }
// console.log([...myIterable])

// function* f() {
//   for (let i = 0; true; i++) {
//     const reset = yield i
//     if (reset) {
//       i = -1
//       console.log(i)
//     }
//   }
// }
// const g = f()
// console.log(g.next())
// console.log(g.next())
// console.log(g.next())
// console.log(g.next(true))
// function* foo(x) {
//   var y = 2 * (yield x + 1)
//   var z = yield y / 3

//   return x + y + z
// }

// var a = foo(5)
// console.log(a.next()) // Object{value:6, done:false}
// a.next() // Object{value:NaN, done:false}
// a.next() // Object{value:NaN, done:true}

// function wrapper(generatorFunction) {
//   return function (...args) {
//     let generatorObject = generatorFunction(...args)
//     generatorObject.next()
//     return generatorObject
//   }
// }

// const wrapped = wrapper(function* () {
//   console.log(`First input: ${yield}`)
//   return 'DONE'
// })

// wrapped().next('hello!')
// // First input: hello!

// function* foo() {
//   yield 1
//   yield 2
//   yield 3
//   yield 4
//   yield 5
//   return 6
// }

// for (let v of foo()) {
//   console.log(v)
// }
// function* fibonacci() {
//   let [prev, curr] = [0, 1]
//   for (;;) {
//     yield curr
//     ;[prev, curr] = [curr, prev + curr]
//   }
// }

// for (let n of fibonacci()) {
//   if (n > 1000) break
//   console.log(n)
// }

// const g = function* () {
//   try {
//     yield
//   } catch (e) {
//     console.log('内部捕获', e)
//   }
// }
// const i = g()
// i.next()
// try {
//   i.throw('a')
//   i.throw('b')
// } catch (e) {
//   console.log('外部捕获', e)
// }
// var g = function* () {
//   try {
//     yield
//   } catch (e) {
//     console.log(e)
//   }
// }

// var i = g()
// i.next()
// i.throw(new Error('出错了！'))
// // Error: 出错了！(…)
// var gen = function* gen() {
//   try {
//     yield console.log('a')
//   } catch (e) {
//     // ...
//   }
//   yield console.log('b')
//   yield console.log('c')
// }

// var g = gen()
// g.next() // a
// g.throw() // b
// g.next() // c

// function* foo() {
//   yield 'a'
//   yield 'b'
// }
// function* bar() {
//   yield 'x'
//   yield* foo()
//   yield 'y'
// }

// for (let v of bar()) {
//   console.log(v)
// }

// function* gen() {
//   yield* ['a', 'b', 'c']
// }
// for (let v of gen()) {
//   console.log(v)
// }
// function* foo() {
//   yield 2
//   yield 3
//   return 'foo'
// }

// function* bar() {
//   yield 1
//   var v = yield* foo()
//   console.log('v: ' + v)
//   yield 4
// }

// var it = bar()

// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// // {value: 1, done: false}
// // {value: 2, done: false}
// // {value: 3, done: false}
// // "v: foo"
// // {value: 4, done: false}
// // {value: undefined, done: true}

// function* iterTree(tree) {
//   if (Array.isArray(tree)) {
//     for (let i = 0; i < tree.length; i++) {
//       yield* iterTree(tree[i])
//     }
//   } else {
//     yield tree
//   }
// }
// const tree = ['a', ['b', 'c'], ['d', 'e']]

// console.log([...iterTree(tree)])
function* numbers() {
  let file = new FileReader('numbers.txt')
  try {
    while (!file.eof) {
      yield parseInt(file.readLine(), 10)
    }
  } finally {
    file.close()
  }
}
numbers().next()
