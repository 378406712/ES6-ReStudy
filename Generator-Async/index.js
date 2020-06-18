const co = require('co')
const fs = require('fs')

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) return reject(error);
      resolve(data);
    });
  });
};

var gen = function* () {
  var f1 = yield readFile('1.txt')
  var f2 = yield readFile('2.txt')
  console.log(f1.toString())
  console.log(f2.toString())
}
co(gen).then(function () {
  console.log('Generator 函数执行完成')
})
