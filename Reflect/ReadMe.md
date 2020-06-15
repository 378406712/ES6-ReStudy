# Reflect

## Reflect 设计目的

- 将 Object 对象的一些明显属于语言内部的方法,如 Object.defineProperty,放到 Reflect 对象上。现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。也就是说，从 Reflect 对象上可以拿到语言内部的方法。
- 修改某些 Object 方法返回结果，让其变得更合理，如 Object.defineProperty(obj,name,desc) 在无法定义属性时，会抛出一个错误，而 defineProperty(obj,name,desc)则会返回 false
- 让 Object 操作都变成函数行为。某些 Object 操作是命令式，如 name in obj 和 delete[name]，而 Reflect.has(obj,name)和 Reflect.deleteProperty(obj,name)让它们变成了函数行为.
- Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础，即不管 Proxy 怎么修改默认行为，总可以早 Reflect 上获取默认行为

## Reflect 静态方法

Reflect 对象一共有 13 个静态方法，同 Proxy。
Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)
上面这些方法的作用，大部分与 Object 对象的同名方法的作用都是相同的，而且它与 Proxy 对象的方法是一一对应的。下面是对它们的解释。

**注，如果 Proxy 对象和 Reflect 对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了 receiver，那么 Reflect.set 会触发 Proxy.defineProperty 拦截。**

Reflect.construct 方法等同于 new target(...args)，这提供了一种不使用 new，来调用构造函数的方法。

Reflect.getPrototypeOf 方法用于读取对象的**proto**属性，对应 Object.getPrototypeOf(obj)。

Reflect.getPrototypeOf 和 Object.getPrototypeOf 的一个区别是，如果参数不是对象，Object.getPrototypeOf 会将这个参数转为对象，然后再运行，而 Reflect.getPrototypeOf 会报错。

**Reflect.apply 方法等同于 Function.prototype.apply.call(func, thisArg, args)，用于绑定 this 对象后执行给定函数。**如果绑定一个函数
的 this 对象,可以写成 fn.apply(obj,args),但如果函数定义了自己的 apply 方法
则只能写成 fn.prototype.apply.call(fn,obj,args)采用 Reflect 对象可以简化这种操作。

观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。
