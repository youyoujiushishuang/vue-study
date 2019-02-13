const fs = require('fs')
const path = require('path')

function getFileData (fPath){
    return new Promise(function(resolve,reject){
        //这里执行异步操作
        fs.readFile(fPath,'utf-8',function(err,data){
            if(err) return reject(err)
            resolve(data)
        })
    })
}

//需求: 按顺序读取文件
getFileData(path.join(__dirname,'file/1.txt'))
.then((result)=>{
    console.log("这是文件1的结果"+result);
    //读取成功后,在读取第二个文件,并返回一个 promise对象,才能接着 .then()
    return getFileData(path.join(__dirname,'file/2.txt'))
})
.then((result)=>{
    console.log("这是文件2的结果"+result);
    return getFileData(path.join(__dirname,'file/3.txt'))
})
.then(result=>{
    console.log("这是文件3的结果"+result);
})
.catch(err=>{
    console.log(err.message);
})

// .catch 是捕获错误,对于串联的异步操作,只要在最后用catch捕获错误就行了,一遇到错误就会终止,抛出错误
// 如果有另一种需求,遇到的错误也不要影响后面的异步操作,那么就不能使用catch来捕获错误了
//需要在每个 .then 中的错误回调都写上,执行对应代码,不过这种需求不常见

console.log("这是栈中的事件,先执行");
