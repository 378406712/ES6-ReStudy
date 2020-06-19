// class Point {}
// console.log(Point === Point.prototype.constructor)

// class Foo {
//   constructor() {
//     // return Object.create(null)
//     console.log(this)
//   }
// }
// console.log(new Foo() instanceof Foo)

// class Point {
//   constructor(x, y) {
//     this.x = x
//     this.y = y
//   }
//   toString() {
//     return '(' + this.x + ', ' + this.y + ')'
//   }
// }
// const point = new Point(2, 3)
// console.log(point.toString())
// console.log(point.hasOwnProperty('x'))
// console.log(point.hasOwnProperty('y'))
// console.log(point.hasOwnProperty('toString'))
// console.log(point.__proto__.hasOwnProperty('toString'))
// console.log(point)

// class MyClass {
//   constructor() {}
//   get prop() {
//     return 'getter'
//   }
//   set prop(value) {
//     console.log('setter:' + value)
//   }
// }

// let inst = new MyClass()
// inst.prop = 123
// console.log(inst)
// const methodName = 'Area'
// class Square{
//     constructor(length){}
//     [methodName](){}
// }
// console.log(new Square())

// const MyClass = class Me {
//   constructor(name) {
//     this.name = name
//   }
//   getClassName() {
//     return Me.name
//   }
// }
// let inst = new MyClass('Me')
// console.log(inst.getClassName()) // Me

// const person = new (class {
//   constructor(name) {
//     this.name = name
//   }
//   sayName() {
//     console.log(this.name)
//   }
// })('liu')
// person.sayName()

// class Point {}
// console.log(Point.name)

// class Foo {
//   constructor(...args) {
//     this.args = args
//   }
//   *[Symbol.iterator]() {
//     for (let arg of this.args) {
//       yield arg
//     }
//   }
// }
// for (let x of new Foo('hello', 'world')) {
//   console.log(x)
// }
// class Foo {
//     static classMethod(){
//         console.log(this)
//         return 'hello'
//     }
// }
// console.log(Foo.classMethod())
// const foo = new Foo()
// console.log(foo)
// class Foo {
//   static bar() {
//     this.baz()
//   }
//   static baz() {
//     console.log('hello')
//   }
//   baz1() { //定义在原型上
//     console.log('world')
//   }
// }
// console.log(new Foo())
// Foo.bar()//'hello' this.指向类
//new Foo().bar() // world
//当去掉bar前的static，this指向实例

// class Foo {
//   static classMethod() {
//     return 'hello'
//   }
// }
// class Bar extends Foo {
//   static classMethod() {
//     return super.classMethod() + ', too'
//   }
// }
// console.log(Bar.classMethod())

// class Foo {}
// Foo.prop = 1

// console.log(Foo.prop)

// function person(name) {
//     console.log(new.target===person)
//   if (new.target !== undefined) {
//     this.name = name
//   } else {
//     throw new Error('必须使用new命令生成实例')
//   }
// }
// fun
// const persons = new person('chen')
// console.log(persons.name)
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Square)//子类继承父类时，new.target返回子类
    console.log(new.target === Rectangle)
    // ...
  }
}

class Square extends Rectangle {
  constructor(length, width) {
    super(length, width)
  }
}

var obj = new Square(3) // 输出 false
