## Module 的加载实现

- 默认情况下，浏览器是同步加载脚本，即渲染引擎遇到 scrpit 标签就会停下来，
  等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须加入脚本下载的世界

- 若脚本的体积很大，下载和执行的时间就会很长，会导致浏览器堵塞，即卡顿的感觉。
  浏览器允许脚本异步加载

```
<script src="" defer>
<script src="" async>

```

- script 标签打开 defer 或 async 属性，脚本就会异步加载。渲染引擎遇到这一行命令就会
  开始下载外部脚本，但不会等待它的下载和执行，而是执行后面的命令。

defer 和 async 的区别:defer 要等到整个页面在内存中正常渲染结束（DOM 树完全生成，以及其他脚本执行完成），才会执行;
async 一旦下载完，渲染引擎就会中断渲染，执行这个脚本后再继续渲染。
即 defer 是“渲染完再执行”，async 是“下载完就执行”。
若有多个 defer 脚本，会按照它们的出现顺序加载，而多个 async 脚本是不能保证加载顺序的。

### 加载规则

- 浏览器加载 ES6 模块，也使用 script 标签，但要加入 type="module"属性。
- 浏览器对于带有 type="module"属性的 script 都是异步加载的，默认 defer 属性，即整个页面渲染完再执行。也可以是 async 属性。
- ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。

```
<script type="module">
  import utils from "./utils.js";

  // other code
</script>
```

- 对于外部的模块脚本（上例是 foo.js），有几点需要注意: 1.代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。 2.模块脚本自动采用严格模式，不管有没有声明 use strict。 3.模块之中，可以使用 import 命令加载其他模块（**.js 后缀不可省略，需要提供绝对 URL 或相对 URL**），也可以使用 export 命令输出对外接口。
  模块之中，顶层的 this 关键字返回 undefined，而不是指向 window。也就是说，在模块顶层使用 this 关键字，是无意义的。
  同一个模块如果加载多次，将只执行一次。

## Es6 模块与 CommonJS 模块的差异

- CommonJS 模块输出的是一个值的拷贝，Es6 模块输出的是值的引用。
- CommonJS 模块是运行时加载,ES6 模块是编译时输出的接口，即静态加载。
- CommonJS 模块加载的是一个对象（即 module.exports 属性)，该对象只有在脚本运行完才会生成，而 Es6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

* CommonJS 模块输出的是值的拷贝:即一旦输出一个值，模块内部的变化就影响不到这个值。
* ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。

- ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

- ES6 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。添加属性可以。

### Nodejs 加载

Node.js 对 ES6 模块的处理比较麻烦，因为它有自己的 CommonJS 模块格式，与 ES6 模块格式是不兼容的。目前的解决方案是，将两者分开，ES6 模块和 CommonJS 采用各自的加载方案。从 v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。

- Nodejs 要求 Es6 模块采用.mjs 后缀文件名，只要脚本中使用了 export，import 命令就必须采用.mjs 后缀名，若不希望使用.mjs 可以在 package.json 中定义{type:module}一旦设置了以后，该目录里面的 JS 脚本，就被解释用 ES6 模块。
  **如果这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成.cjs。如果没有 type 字段，或者 type 字段为 commonjs，则.js 脚本会被解释成 CommonJS 模块。**

  - 即.mjs 文件总是以 ES6 模块加载，.cjs 文件总是以 CommonJS 模块加载，.js 文件的加载取决于 package.json 里面 type 字段的设置。
  - 注:ES6 模块与 CommonJS 模块尽量不要混用。require 命令不能加载.mjs 文件，会报错，只有 import 命令才可以加载.mjs 文件。反过来，.mjs 文件里面也不能使用 require 命令，必须使用 import。

  ### main 字段

  - package.json 文件有两个字段可以指定模块的入口文件：main 和 exports。比较简单的模块，可以只使用 main 字段，指定模块加载的入口文件。

  ```
  {
  "type": "module",//指定为es6模块，为commonjs指定为Commonjs
  "main": "./src/index.js"
  }
  ```

  ### exports 字段

  - exports 字段的优先级高于 main 字段

  （1）子目录别名:package.json 文件的 exports 字段可以指定脚本或子目录的别名。

  ```{
  "exports": {
    "./submodule": "./src/submodule.js"//指定src/submodule.js别名为submodule，然后就可以从别名加载这个文件。
  }
  //即import submodule from 'es-module-package/submodule';
  }

  ```

  （2）main 的别名：exports 字段的别名如果是.，就代表模块的主入口，优先级高于 main 字段，并且可以直接简写成 exports 字段的值。

  ```{
  "exports": {
    ".": "./main.js"
  }
  }
  // 等同于
  {
  "exports": "./main.js"
  }
  ```

  //由于 exports 字段只有支持 ES6 的 Node.js 才认识，所以可以用来兼容旧版本的 Node.js。

```

```

（3）条件加载

### ES6 模块加载 CommonJS 模块

package.json 文件的 main 字段指定 CommonJS 入口，给 Node.js 使用；module 字段指定 ES6 模块入口，给打包工具使用，因为 Node.js 不认识 module 字段。

```{
  "type": "module",
  "main": "./index.cjs",
  "exports": {
    "require": "./index.cjs",
    "default": "./wrapper.mjs"
  }
}
```

**注:import 命令加载 CommonJS 模块，只能整体加载，不能只加载单一的输出项。**

### CommonJS 模块加载 ES6 模块

- CommonJS 的 require 命令不能加载 ES6 模块，会报错，只能使用 import()这个方法加载。

```(async () => {
  await import('./my-app.mjs');
})();
```

### 内部变量

- this 关键字。ES6 模块之中，顶层的 this 指向 undefined；CommonJS 模块的顶层 this 指向当前模块，这是两者的一个重大差异。

- 其次，以下这些顶层变量在 ES6 模块之中都是不存在的。
  arguments
  require
  module
  exports
  **filename
  **dirname
  循环加载

## 循环加载

- 指 a 脚本的执行依赖 b 脚本，b 脚本的执行又依赖 a 脚本

```// a.js
var b = require('b');

// b.js
var a = require('a');
```

通常，“循环加载”表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。

- 对于 JavaScript 语言来说，目前最常见的两种模块格式 CommonJS 和 ES6，处理“循环加载”的方法是不一样的，返回的结果也不一样。

### CommonJS 模块的加载原理

-CommonJs 的一个模块，就是一个脚本文件。require 命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象

```{
  id: '...',//模块名
  exports: { ... },//块输出的各个接口
  loaded: true,//loaded属性是一个布尔值，表示该模块的脚本是否执行完毕。
  ...
}
```

- 以后需要用到这个模块的时候，就会到 exports 属性上面取值。即使再次执行 require 命令，也不会再次执行该模块，而是到缓存之中取值。也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。

### CommonJS 模块的循环加载

- CommonJS 模块的重要特性是加载时执行，即脚本代码在 require 的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。

### ES6 模块的循环加载

- ES6 模块是动态引用，如果使用 import 从一个模块加载变量（即 import foo from 'foo'），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。
