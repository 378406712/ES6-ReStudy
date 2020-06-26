// console.log(
//   '中' === '\u4e2d' // true
// )

// alert`123`
// alert(['hello'])
// console.log(`123`)

// const a = 5
// const b = 10
// tag`Hello ${a + b} world ${a * b}`
//类似于
// tag(['Hello', 'world', ''], 15, 50)

function SaferHTML(templateData) {
  let s = templateData[0]
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i])

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // Don't escape special characters in the template.
    s += templateData[i]
  }
  return s
}
let sender = '<script>alert("abc")</script>' // 恶意代码
let message = SaferHTML`<p>${sender} has sent you a message.</p>`

console.log(message)
