// class Point {
//   constructor(a, b) {
//     this.x = a
//     this.y = b
//   }
//   static hello() {
//     return 'say hello'
//   }
//   toString() {
//     return this.x + ' ' + this.y
//   }
// }
// const point = new Point('a', 'b')
// class ColorPoint extends Point {
//   constructor(...args) {
//     super(...args)
//     console.log(args)
//     this.color = args[2]
//   }
//   toString() {
//     return this.color + ' ' + super.toString() // 调用父类的toString()
//   }
// }
// const color = new ColorPoint('hello', 'world', 'red')
// console.log(color.toString()) // must call super constructor before using 'this' in derived class constructor
// console.log(color instanceof ColorPoint)
// console.log(color instanceof Point)
// console.log(Point.hello()) //父类调用父类静态方法
// console.log(ColorPoint.hello()) //子类调用父类静态方法

// console.log(Object.getPrototypeOf(ColorPoint) === Point) //true
//  console.log(ColorPoint.__proto__ === Point) //true

// class A {
//   constructor() {
//     console.log(new.target.name)
//   }
// }
// class B extends A {}

// new A()//A
// new B()//B

// class A {
//   constructor() {
//     this.p = 2
//   }
//   run() {
//     console.log(this.p)
//   }
//   //   p() {
//   //     return 2
//   //   }
// }
// class B extends A {
//   constructor() {
//     super()
//     // super.run() //run
//     // super.p() // 2
//     // console.log(super.p() === A.prototype.p()) //true
//   }
//   get m() {
//     // return super.x
//     return super.run()
//   }
// }
// A.prototype.x = 3 //如果实行定义在父类的原型上，super就可以取到
// let b = new B()
// b.m

// class A {
//   constructor() {
//     this.x = 1
//     this.print = print
//   }
//   print() {
//     console.log(this.x)
//   }
// }

// class B extends A {
//   constructor() {
//     super()
//     this.x = 2
//   }
//   m() {
//     super.print()
//   }
// }
// let b = new B()

// b.m()
// let a = new A()

// class Parent {
//   x = 1
//   static myMethod(msg) {
//     console.log('static', msg)
//   }
//   myMethod(msg1) {
//     console.log('instance', msg1)
//   }
// }

// class Child extends Parent {
//   static myMethod(msg) {
//     super.myMethod(msg)
//   }
//   myMethod(msg) {
//     super.myMethod(msg)
//   }
// }

// Child.myMethod(1) // static 1

// var child = new Child()
// child.myMethod(2) // instance 2
// console.log(Parent)
// console.log(Child)

// class A {
//   constructor() {
//     this.x = 1
//   }
//   static print() {
//     console.log(this.x)
//   }
// }

// class B extends A {
//   constructor() {
//     super()
//     this.x = 2 //定义在实例上
//   }
//   static m() {
//     super.print()
//   }
// }
// let b = new B()
// let a = new A()
// B.x = 3 //定义在原型上
// B.m() // 3
// console.log(b)
// var obj = {
//   a: 1
// }

// console.log(obj) // MyObject: [object Object]

// class A {}
// class B extends A {}
// let a = new A()
// let b = new B()
// console.log(B.prototype.__proto__ == A.prototype)
// console.log(a.__proto__ == A.prototype)
// console.log(b.__proto__ == B.prototype)
// console.log(B.__proto__ == A)
// console.log(b)
