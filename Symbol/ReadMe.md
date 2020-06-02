# Symbol

## 概述

Symbol:ES6 引入的一种新的原始数据类型，表示独一无二的值.
JS 新七大基本类型:undefined,null,Boolean,Object,String,Number.Symbol.
创建方式 Symbol 函数生成.
对象的属性名类型：字符串,Symbol(所创建的属性名独一无二,可保证与其他属性名不会冲突)

**注:**
1.Symbol 函数不能使用 new 命令,否则报错.因为生成的 Symbol 是一个原始类型的值，不是对象。因为其值不是对象，所以不能添加属性，它类似于字符串的数据类型.
2.Symbol 函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的 Symbol 函数的返回值是不相等的。
3.Symbol 值不能与其他类型的值进行运算，会报错。
4.Symbol 值也可以转为布尔值，但是不能转为数值。
5.ES2019 提供了一个实例属性 description，直接返回 Symbol 的描述。
6.Symbol 值作为对象属性名时，不能用点运算符,只能用[]。
7.Symbol 作为常量的最大的好处，就是其他任何值都不可能有相同的值了，
因此可以保证上面的 switch 语句会按设计的方式工作。
8.Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。(#) 9.魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。
10.Symbol 作为属性名，遍历对象的时候，该属性不会出现在 for..in
,for..of 循环中，也不会被 Object.keys(),Object.getOwnPropertyNames(),JSON.stringify()返回.
也不是私有属性，有一个 Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
11.Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

FAQ:
1.Symbol.for()与 Symbol()区别:
前者会被登记在全局环境中供搜索，后者不会。
Symbol.for()每次调用就返回一个新的 Symbol 类型的值，是先检查 是否已经存在该 key 值，若
不存在则新建一个值

2.Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的 key。
**Symbol.for()每次调用就返回一个新的 Symbol 类型的值**

3.Singleton 模式
指调用一个类，任何时候返回的都是同一个实例
