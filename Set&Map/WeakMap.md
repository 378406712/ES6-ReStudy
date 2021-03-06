# WeakMap

# 与 map 的区别

- WeakMap 值接受对象作为键名(null 除外),不接受其他类型的
  值作为键名.
- WeakMap 的键名所指向的对象，不计入垃圾回收机制。它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
- 基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用 WeakMap 结构。
  **注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。**  
