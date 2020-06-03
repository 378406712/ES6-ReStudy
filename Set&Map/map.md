# Map

- JS 的对象(Object)本质上是键值对的集合(Hash 结构),传统上只能使用字符串当做键名。
- Set 和 Map 都可以用来生成新的 Map。
  **注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。**
- Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。
- Map 的操作方法/属性:size 属性返回 map 结构成员总数;set()方法相当于 Set 结构的 add 方法，如果结构中已经有该成员则更新，没有就添加;gkeyet(方法)读取对应的键值-;has()返回一个布尔值，是否存在该键;del()删除某键;clear()清空.
- Map 的遍历方法:keys(),values(),entries(),forEach()
- Map 结构的默认遍历器接口:entries()
- Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）
- 结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。
- Map 还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。
