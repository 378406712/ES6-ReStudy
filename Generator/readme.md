# Generator 函数

- Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同
- Generator 函数是一个状态机，封装了多个内部状态
- 执行 Generator 函数会返回一个遍历器对象
- 形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function 关键字与函数名之间有一个星号；二是，函数体内部使用 yield 表达式，定义不同的内部状态（yield 在英语里的意思就是“产出”）。
- Generator 函数是分段执行的，yield 表达式是暂停执行的标记，而 next 方法可以恢复执行

## yield 表达式

- yield 表达式就是暂停标志
- 遍历器对象 next 方法运行逻辑：
  - 遇到 yield 表达式，就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的 value 属性值。
  - 下一次调用 next 方法时，再继续往下执行，直到遇到下一个 yield 表达式。
  - 如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到 return 语句为止，并将 return 语句后面的表达式的值，作为返回的对象的 value 属性值。
  - 如果该函数没有 return 语句，则返回的对象的 value 属性值为 undefined。
- 注：yield 表达式后面的表达式，只有当调用 next 方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
- yield 与 return 的异同：
  - 相同点:都能返回紧跟语句后的那个表达式的值
  - 不同点：每次遇到 yield，函数暂停执行，下一次再从该位置继续向后执行;而 return 语句不具备位置记忆功能。
    一个函数内只能执行一个 return 语句，却能执行多个 yield 表达式;
    正常函数只能返回一个值，因为只能执行一次 return；Generator 函数可以返回一系列的值，因为可以有任意多个 yield。
- yield 表达式只能用在 Generator 函数里面，用在其他地方都会报错。
- yield 表达式如果用在另一个表达式之中，必须放在圆括号里面。

## 与 Iterator 接口的关系

- 由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的 Symbol.iterator 属性，从而使得该对象具有 Iterator 接口。

## next 方法的参数

- yield 表达式本身没有返回值，或者说总是返回 undefined。
- next 方法可以带一个参数，该参数会被当做上一个 yield 表达式的返回值
- 注：**由于 next 方法的参数表示上一个 yield 表达式的返回值，所以在第一次使用 next 方法时，传递参数是无效的。**
- 从语义上讲，第一个 next 方法用来启动遍历器对象，所以不用带有参数。

## for...of 循环

- for...of 遍历可以自动遍历 Generator 函数运行时生成的 Iterator 对象，且此时**不再需要调用 next 方法**
- 一旦 next 方法的返回对象的 done 属性为 true，for...of 循环就会中止，且不包含该返回对象

## Generator.prototype.throw()

- throw 方法可以接受一个参数，该参数会被 catch 语句接收，建议抛出 Error 对象的实例。
- throw 方法抛出的错误要被内部捕获，前提是必须至少执行过一次 next 方法。
- throw 方法被捕获以后，会附带执行下一条 yield 表达式。也就是说，会附带执行一次 next 方法。

## Generator.prototype.return()

- 可以返回给定的值，并且终结遍历 Generator 函数。
- 如果 return 方法调用时，不提供参数，则返回值的 value 属性为 undefined。
- 如果 Generator 函数内部有 try...finally 代码块，且正在执行 try 代码块，那么 return 方法会导致立刻进入 finally 代码块，执行完以后，整个函数才会结束。等到 finally 代码块执行完，再返回 return()方法指定的返回值

## next()、throw()、return() 的共同点

- 作用都是让 Generator 函数恢复执行，并且使用不同的语句替换 yield 表达式，并且使用不同的语句替换 yield 表达式。
  - next()是将 yield 表达式替换成一个值。
  - throw()是将 yield 表达式替换成一个 throw 语句
  - return()是将 yield 表达式替换成一个 return 语句

## yield\* 表达式

如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历。

- ES6 提供了 yield\*表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数。
- 如果 yield 表达式后面跟的是一个遍历器对象，需要在 yield 表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为 yield\*表达式。
- yield\*后面的 Generator 函数（没有 return 语句时），等同于在 Generator 函数内部，部署一个 for...of 循环。
- 反之，在有 return 语句时，则需要用 var value = yield\* iterator 的形式获取 return 语句的值。
- 如果 yield\*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。
- 任何数据结构只要有 Iterator 接口，就可以被 yield\*遍历。
- yield\*命令可以很方便地取出嵌套数组的所有成员。

## 作为对象属性的 Generator 函数

可写成

```
let obj = {
    * myGenerator(){
        ...
    }
}
```

## Generator 函数的 this

- Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的 prototype 对象上的方法。
- 如果把 g 当作普通的构造函数，并不会生效，因为 g 返回的总是遍历器对象，而不是 this 对象。
- **Generator 函数也不能跟 new 命令一起用，会报错**

## Generator 与状态机

- Generator 之所以可以不用外部变量保存状态，是因为它本身就包含了一个状态信息，即目前是否处于暂停态。

## Generator 与协程

协程:coroutine,是一种程序运行的方式，可理解为“协作的线程”或“协作的函数”。写成既可以用单线程实现，也可以用多线程实现，前者是一种特殊的子例程，后者是一种特殊的线程。

- 传统的“子例程”（subroutine）采用堆栈式“后进先出”的执行方式，只有当调用的子函数完全执行完毕，才会结束执行父函数。协程与其不同，多个线程（单线程情况下，即多个函数）可以并行执行，但是只有一个线程（或函数）处于正在运行的状态，其他线程（或函数）都处于暂停态（suspended），线程（或函数）之间可以交换执行权。也就是说，一个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），等到稍后收回执行权的时候，再恢复执行。这种可以并行执行、交换执行权的线程（或函数），就称为协程。

## Generator 应用

- 异步操作的同步化表达：
  Generator 函数的暂停执行的效果，意味着可以把异步操作写在 yield 表达式里面，等到调用 next 方法时再往后执行
  这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在 yield 表达式下面，反正要等到调用 next 方法时再执行。所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数。
- 利用 Generator 函数，可以在任意对象上部署 Iterator 接口。