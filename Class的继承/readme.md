# CLass 的继承

- class 而已通过 extends 关键字实现继承，比 ES5 通过修改原型链实现继承要更清晰方便。
- 子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错： must call super constructor before using 'this' in derived class constructor
  因为子类自己的 this 对象必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的属性和方法。若不先调用 super 方法，子类就得不到 this 对象。
- ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到上面(Parent.apply(this))
- ES6 的继承，实质是先将父类实例对象的属性和方法加到 this 上，所以必须先调用 super 方法，然后再用子类的构造方法修改 this
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
- ES6规定，在子类普通方法中通过super调用父类方法时，方法内部的this指向当前的子类实例
- super作为对象用在静态方法之中，指向父类，而不是父类的原型对象

