# Async 函数

- ES2017 引入的 async 函数，是 generator 函数的语法糖
- async 函数是将 generator 函数的星号替换成 async,将 yield 替换成 await
- async 对 generator 的改进:
  - 内置执行器：Generator 函数的执行必须靠执行器，所以有了 co 模块。
    而 async 函数自带执行器，即 async 函数的执行与普通函数相同，只需要一行。
  - 更好的语义：asycn 和 await 比起星号和 yield 的语义更清楚。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。
  - 更广的实用性：co 模块约定，yield 后面只能更 Thunk 函数或 promise 对象，而 async 函数的 await 命令后，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
  - 返回的是 Promise：async 返回值是 Promise 对象，而比 Generator 函数的返回值是 Iterator 对象方便，可以用 then 方法指定下一个操作。

**async 函数可以看成是多个异步操作，包装成一个 Promise 对象，而 await 命令就是内部 then 命令的语法糖**

## 用法

- async 函数返回一个 Promise 对象，可以用 then 方法添加回调函数。当函数执行的时候，一旦遇到 await 就先返回，等到异步操作完成，再执行函数体后面的语句。

## 返回 Promise 对象

- async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数.

## Promise 对象的状态变化

- async 函数返回的 Promise 对象必须等到内部所有 await 命令后面的 Promise 对象执行完毕，才会发生状态改变，除非遇到 return 或抛出错误。
  即只有 async 函数内部的异步操作执行完，才会执行 then 方法指定的回调函数

## await 命令

- 正常情况下，await 命令后面是一个 Promise 对象，返回该对象的结果。
  如果不是 Promise 对象，就直接返回对应的值.
- 任何一个 await 语句后面的 Promise 对象变为 reject 状态，那么整个 async 函数都会中断执行。
- 如果希望即使前一个异步操作失败，也不中断后面的异步操作，可以将第一个 await 放在 try...catch 结构里.
- 另一种方法是 await 后面的 Promise 对象再跟一个 catch 方法，处理前面可能出现的错误。

## 错误处理

- 如果 await 后的异步操作出错，等同于 async 函数返回的 Promise 对象被 reject

## 注

- 第一点，前面已经说过，await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中/加 catch 语句。
- 第二点，多个 await 命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。可以用 promise.all
- 第三点，await 命令只能用在 async 函数之中，如果用在普通函数，就会报错。
- 第四点，async 函数可以保留运行堆栈。

## async 函数的实现原理

- async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

## 与其他异步处理方法的比较

- sync 函数的实现最简洁，最符合语义。它将 Generator 写法中的自动执行器，改在语言层面提供，不暴露给用户，因此代码量最少。如果使用 Generator 写法，自动执行器需要用户自己提供。

## 按顺序完成异步操作 
- 只有async函数内部是继发执行
