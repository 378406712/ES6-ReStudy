# 结构赋值

- ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
- 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，(有无 iteratr 接口)，那么将会报错。
- 解构赋值允许指定默认值。
- ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于 undefined，默认值才会生效。

### 对象解构赋值

- 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。如果解构失败，变量的值等于 undefined。
- **注:对象的解构赋值可以取到继承的属性。**
- 对象的解构也可以指定默认值。默认值生效的条件是，对象的属性值严格等于 undefined。

### 圆括号问题

- 如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。
- 但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。

### 不能使用圆括号的情况

- **变量声明语句** let const var 
- 函数参数，也属于变量声明，因此不能带有圆括号。
- 赋值语句的模式

### 可以使用圆括号的情况

- 赋值语句的非模式部分，可以使用圆括号。
