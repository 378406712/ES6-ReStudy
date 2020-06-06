# Proxy

- Proxy 用于修改某些操作的默认行为，等同于在语言层做出修改，属于一种"元编程",即对编程语言进行编程
- 其可以理解为在目标对象之前设一层"拦截",外界对该对象的访问，都必须先通过这层拦截，提供了一种机制，可以对外界的返回顾问进行过滤和改写。Proxy 原意为代理，这里表示由它来“代理”某些操作，也可称为“代理器”
- Proxy(target, handler)

  - target：所要拦截的目标对象
  - handle：用来定制拦截行为的对象

- Proxy 的 13 中拦截操作:
  - get(target,propKey,receiver):拦截对象的属性读取,如 proxy.foo,proxy['foo]
  - set(target,propKey,value,receiver):拦截对象的属性设置,如 proxy.foo = v;proxy['foo'] = v,返回一个布尔值.
  - has(target,propKey):拦截 propKey in proxy 的操作
  - deleteProperty(target,propKey):拦截 delete proxy[propKey]的操作,返回一个布尔值.
  - ownKeys(target):拦截 Object.getOwnPropertyNames(proxy),Object.getOwnPropertySymbols(proxy),Object.keys(proxy),for...in 小循环，返回一个数组。该方法返回目标对象**所有自身的属性**的属性名，而 Object.keys()返回结果仅包括目标对象自身的**可遍历属性**
  - getOwnPropertyDescriptor(target,propKey):拦截 Object.getOwnPropertyDescriptor(proxy,propKey),返回属性的描述对象。
  - defineProperty(target,propKey,propDesc):拦截 Object.defineProperty(proxy,propKey,propDesc),Object.defineProperties(proxy,propDescs)返回一个布尔值
  - preventExtensions(target):拦截 Object.setPrototypeOf(proxy,proto),返回一个布尔值
  - getPrototypeOf(target):拦截 Object.getPrototypeOf,返回一个布尔值。
  - isExtensible(target):拦截 Object.isExtensible(proxy),返回一个布尔值
  - setPrototypeOf(target,proto):拦截 Object.setPrototypeOf(proxy,proto)返回一个布尔值。如果目标对象是函数，那还有 2 中额外操作可以拦截。
  - apply(target,object,args):拦截 Proxy 实例作为函数调用的操作，如 proxy(...args),proxy.all(object,...args),proxy.apply(...)
  - construct(target,args):拦截 Proxy 实例作为构造函数调用的操作，如 new proxy(...args)

## Proxy 实例的方法

- get 方法用于拦截某个属性的读取操作，可以接受三个参数(目标对象，属性名，proxy 实例本身[操作行为所针对的对象])，第三个参数可选
- set 方法用于拦截某个属性的赋值操作，可以接受 4 个参数(目标对象，
  属性名，属性值，Proxy 实例本身[可选])
- apply 方法拦截函数的调用，可接受 3 个参数(目标对象，目标对象上下文[this],目标对象的参数数组)
- has 方法用来拦截 HasProperty 操作，即判断对象是否具有某个属性时，这个方法会生效。
  可接受 2 个参数(目标对象，需查询的属性名)
  **注:has 方法拦截的是 HasProperty 操作，而不是 HasOwnProperty 操作，即 has 方法不判断一个属性是对象自身的属性，还是继承的属性。**
  虽然 for...in 循环也用到了 in 运算符，但是 has 拦截对 for...in 循环不生效。
- construct 方法用于拦截 new 命令，可接受 3 个参数(目标对象，构造函数的参数对象，创造实例对象时 new 命令作用的构造函数),
  **construct 方法返回的必须是一个对象，否则会报错。**
- deleteProperty 方法用于拦截 delete 操作，若这个方法抛出错误或者
  返回 false，则当前属性就无法被 delete 命令删除
- getOwnPropertyDescriptor 方法拦截 Object.getOwnPropertyDescriptor(),返回一个属性描述对象或 undefined。
- getPrototypeOf 方法主要拦截获取对象的原型，如：Object.prototype.\_\_proto\_\_,
  Object.prototype.isPrototypeOf()
  Object.getPrototypeOf()
  Reflect.getPrototypeOf()
  instanceof
- isExtensible 方法拦截 Object.isExtensible()[Object.isExtensible() 方法判断一个对象是否是 sd 可扩展的(是否可以在它上面添加新的属性)]操作
- ownKeys 方法用来拦截对象的自身属性的读取操作，如：
  Object.getOwnPropertyNames()
  Object.getOwnPropertySymbols()
  Object.keys()
  for...in 循环
  **注，使用 Object.keys()方法时，有三类属性会被 ownKeys()方法自动过滤，不会返回。目标对象上不存在的属性,属性名为 Symbol 值,不可遍历（enumerable）的属性**
  ownKeys()方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。
- preventExtensions 方法拦截 Object.preventExtensions()，该方法必须返回一个布尔值，否则会自动转化为布尔值。
  这个方法有一个限制，只有目标对象不可扩展时（即 Object.isExtensible(proxy)为 false），proxy.preventExtensions 才能返回 true，否则会报错。
- setPrototypeOf 方法用来拦截 Object.setPrototypeOf()方法。[Object.setPrototypeOf() 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或 null。]

## Proxy.revocable

- 该方法返回一个可取消的 Proxy 实例对象，revoke 属性是一个函数，可以取消 proxy 实例.
- Proxy.revocable()的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

## Proxy 中的 this

- 虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的 this 关键字会指向 Proxy 代理。
