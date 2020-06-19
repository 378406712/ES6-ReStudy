// async function timeout(ms) {
//   await new Promise((resolve, reject) => {
//     setTimeout(resolve, ms)
//   })
// }
// async function asyncPrint(value, ms) {
//   await timeout(ms)
//   console.log(value)
// }
// asyncPrint('Hello world', 1000)

// const f = async () => {
//   // return '123'
//   throw new Error('出错')
// }

// f().then(
//   (v) => console.log(v),
//   (e) => console.log(e)
// )

// class Sleep {
//   constructor(timeout) {
//     this.timeout = timeout
//   }
//   then(resolve, reject) {
//     const startTime = Date.now()
//     setTimeout(() => resolve(Date.now() - startTime), this.timeout)
//   }
// }

// !(async () => {
//   const sleepTime = await new Sleep(1000)
//   console.log(sleepTime)
// })()

// function sleep(interval) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, interval)
//   })
// }
// // 用法
// async function one2FiveInAsync() {
//   for (let i = 1; i <= 5; i++) {
//     console.log(i)
//     await sleep(1000)
//   }
// }
// one2FiveInAsync()
// async function f() {
//   try {
//     await Promise.reject('出错')
//   } catch (error) {
//     console.log(error)
//   }
//   return await Promise.resolve('hello world')
// }
// async function f() {
//   await Promise.reject('出错').catch((e) => console.log(e))

//   return await Promise.resolve('hello world')
// }
// f().then(
//   (v) => console.log(v),
//   (e) => console.log(e)
// )

async function loads(urls) {
  //并发处理远程url
  const textPromises = urls.map(async (url) => {
    const response = await fetch(url)
    return response.text()
  })
  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise)
  }
}
