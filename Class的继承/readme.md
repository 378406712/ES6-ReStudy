# CLass 的继承

- class 而已通过 extends 关键字实现继承，比 ES5 通过修改原型链实现继承要更清晰方便。
- 子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错： must call super constructor before using 'this' in derived class constructor
  因为子类自己的 this 对象必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的属性和方法。若不先调用 super 方法，子类就得不到 this 对象。
- ES5 的继承，实质是**先创造子类的实例对象 this**，然后再将父类的方法添加到上面(Parent.apply(this))
- ES6 的继承，实质是先将**父类实例对象**的属性和方法加到 this 上，所以必须先调用 super 方法，然后再用子类的构造方法修改 this
- 如果子类没有定义 constructor 方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有 constructor 方法。
- 父类的静态方法，也会被子类所继承

## Object.getPrototypeOf()

- Object.getPrototypeOf()方法可以用来从子类上获取父类.
- 可以使用 Object.getPrototypeOf()判断，一个类是否继承了另一个类。

## super 关键字

- super 关键字既可以当做函数使用，也可以当做对象使用，两种情况的用法不同
- super 作为函数调用:代表父类的构造函数。ES6 要求子类的构造函数必须执行一次 super 函数
- super 虽然代表父类的构造函数，但是返回的是子类的实例。即 super 内部的 this 指的是子类的实例，super()在这里相当于 Parent.prototype.constructor.call(this)
- 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错
- super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中指向父类
- 因为作为 super 作为对象时，指向父类的原型对象，所以无法获取父类实例上的方法或属性
- 如果属性定义在父类的原型对象上，super 就可以取到。
- ES6 规定，在子类普通方法中通过 super 调用父类方法时，方法内部的 this 指向当前的子类实例
- super 作为对象用在静态方法之中，指向父类，而不是父类的原型对象
- 注意，使用 super 的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错
- 子类**proto**属性，表示构造函数的继承，总是指向父类
- 子类 prototype 属性的**proto**总是指向父类的 prototype 属性
- Class 作为构造函数的语法糖，同时有 prototype 属性和**proto**属性，因此同时存在两条继承链。
- 作为一个对象，子类 B 的原型(**proto**属性)是父类；
  作为一个构造函数，子类 B 的原型对象的（prototype 属性）是父类原型对象(prototype 属性)的原型

## 实例的**proto**属性

- 子类原型的原型是父类的原型

```
B.__proto__(B.prototype).__proto__ = A.__proto__(A.prototype)
```

## 原生构造函数的继承

- 原生构造函数指的是语言内置的构造函数，通常用来生成数据结构
- ECMAScript 的原生构造函数：Boolean(),Number(),String(),Array(),Date(),Function(),RegExp(),Error(),Object()
- ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象 this，然后再用子类的构造函数修饰 this，使得父类的所有行为都可以继承。
- extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数

## Mixin模式的实现
- Mixin指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。
