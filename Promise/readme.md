# Promise

- Promise 是异步变成的一种解决方案
- 简单来说就是一个容器，里面保存着某个未来才会结束的事情(通常是一个异步操作)的结果.
- 语法上说,Promise 是一个对象，从它可以获取异步操作的消息
- Promise 对象具有 2 个特点：
  - 对象状态不受外界影响。Promise 对象有 3 种状态(pending 进行中,fulfilled 已成功,rejected 已失败)。只有异步操作的结果可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 名字的由来，代表“承诺”，表示其他手段无法改变。
  - 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有 2 中可能，pending=>fulfilled,pending=>rejected、只要这 2 种情况发生了，状态就凝固了，不会再变了，会一直保持这个结果，这时成为 resolved(已定型).如果改变已经发生了，再对 Promise 对象添加回调函数，也会立即得到这个结果.这与事件(Event)完全不同，事件的特点是，如果错过了，再去监听，是得不到这个结果的
- 有了 Promise 对象就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。Promise 提供统一接口。
- Promise 的缺点，无法取消 Promise 一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误不会反应到外部。第三，当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚开始还是即将完成）
- ES6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例

## Promise.prototype.then()

- then 方法可以接受 2 个回调函数作为参数。一个是 resolved 时调用，另一个 rejected 调用，第二个参数可选
- then 方法返回的是一个新的 Promise 实例，不是原来那个，可采用链式写法

## Promise.prototype.catch()

- 是.thne(null,rejected)或.then(undefined,rejected)的别名，用于指定发生错误时的回调函数
- Promise 对象的错误具有"冒泡"性质，会一直向后传递，直到被“捕获”为止，即错误总是会被下一个 catch 语句捕获
- 一般来说，不要在 then 方法中定义 rerject 状态的回调函数，总是使用 catch 方法.理由是第二种写法可以捕获前面 then 方法执行中的错误，也更接近同步的写法（try/catch）。
- 建议总是使用 catch()方法，而不使用 then()方法的第二个参数。
- 跟传统的 try/catch 代码块不同的是，如果没有使用 catch()方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

## Promise.prototype.finally()

- finally()方法与用于指定不管 Promise 对象最后状态如何，都会执行的操作。ES2018 引入
- finally 方法的回调函数不接受任何参数，意味着没有办法知道前面的 Promise 状态到底是 fulfilled 还是 rejected，表面 finally 方法内的操作与状态物管，不依赖 Promise 的执行结果
- finally 本质上是 then 方法的特例

## Promise.all()

- 用于将多个 Promise 实例，包装成一个新的 Promise 实例
- Promise.all 方法的参数必须要有 Iterator 接口，且返回的每个成员都是 Promise 实例。
- 只有成员的状态都为 fulfilled，则 Promise.all 返回 resolved，否则返回 rejected

## Promise.race()

- 将多个 Promise 实例，包装成一个新的 Promise 实例。
- 只要成员中有一个实例率先改变状态，那个率先改变的 Promise 实例的返回值，就传递给 p 的回调函数。

## Promise.allSettled()

- 接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
- 只有等到所有这些参数实例都返回结果，不管是 fulfilled 还是 rejected，包装实例才会结束.ES2020 引入
- 有时候，我们不关心异步操作的结果，只关心这些操作有没有结束。这时，Promise.allSettled()方法就很有用。如果没有这个方法，想要确保所有操作都结束，就很麻烦。Promise.all()方法无法做到这一点。

## Promise.any()

- Promise.any()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
- 只要参数实例有 1 个变成 fulfilled/rejected 状态，包装实例就变成 fulfilled/rejected 状态(提案阶段)

## Promise.resolve()

- 有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。

````Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))```
````

Promise.resolve 方法的参数分成四种情况。

- thenable 对象指的是具有 then 方法的对象
  - 参数是一个 Promise 实例,那么 Promise.resolve 将不做任何修改、原封不动地返回这个实例。
  - 参数是一个 thenable 对象,Promise.resolve 方法会将这个对象转为 Promise 对象，然后就立即执行 thenable 对象的 then 方法。
  - 参数不是具有 then 方法的对象，或根本就不是对象:如果参数是一个原始值，或者是一个不具有 then 方法的对象，则 Promise.resolve 方法返回一个新的 Promise 对象，状态为 resolved。
  - 不带有任何参数：Promise.resolve()方法允许调用时不带参数，直接返回一个 resolved 状态的 Promise 对象。

## Promise.reject()

- Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为 rejected。
- 注意，Promise.reject()方法的参数，会原封不动地作为 reject 的理由，变成后续方法的参数。这一点与 Promise.resolve 方法不一致。

## Promise.try()

- 实际开发中，经常遇到一种情况：不知道或者不想区分，函数 f 是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管 f 是否包含异步操作，都用 then 方法指定下一步流程，用 catch 方法处理 f 抛出的错误。
- 让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API

```const f = () => console.log('now');
(async () => f())()
.then(...)
.catch(...)
```

或者

````const f = () => console.log('now');
(
  () => new Promise(
    resolve => resolve(f())
  )
)();
console.log('next');```
````

- 提案:

````const f = () => console.log('now');
Promise.try(f);
console.log('next');```
````
