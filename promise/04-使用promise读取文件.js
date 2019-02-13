//Promise 简介: 

// 1. Promise 是一个 构造函数，既然是构造函数， 那么，我们就可以  new Promise() 得到一个 Promise 的实例；
// 2. 在 Promise 上，有两个函数，分别叫做 resolve（成功之后的回调函数） 和 reject（失败之后的回调函数）
// 3. 在 Promise 构造函数的 Prototype 属性上，有一个 .then() 方法，也就说，只要是 Promise 构造函数创建的实例，都可以访问到 .then() 方法
// 4. Promise 表示一个 异步操作；每当我们 new 一个 Promise 的实例，这个实例，就表示一个具体的异步操作；
// 5. 既然 Promise 创建的实例，是一个异步操作，那么，这个 异步操作的结果，只能有两种状态：
//  5.1 状态1： 异步执行成功了，需要在内部调用 成功的回调函数 resolve 把结果返回给调用者；
//  5.2 状态2： 异步执行失败了，需要在内部调用 失败的回调函数 reject 把结果返回给调用者；
//  5.3 由于 Promise 的实例，是一个异步操作，所以，内部拿到 操作的结果后，无法使用 return 把操作的结果返回给调用者； 这时候，只能使用回调函数的形式，来把 成功 或 失败的结果，返回给调用者；
// 6. 我们可以在 new 出来的 Promise 实例上，调用 .then() 方法，【预先】 为 这个 Promise 异步操作，指定 成功（resolve） 和 失败（reject） 回调函数；


// 注意：这里 new 出来的 promise， 只是代表 【形式上】的一个异步操作；
// 什么是形式上的异步操作：就是说，我们只知道它是一个异步操作，但是做什么具体的异步事情，目前还不清楚
// var promise = new Promise()

const fs = require('fs')
const path = require('path')
/* var p = new Promise(function(resolve,reject){
    //这里执行异步操作
    fs.readFile(path.join(__dirname,'file/1.txt'),'utf-8',function(err,data){
        console.log(data);
    })
}) */

//上面还是只在控制台打印了结果,初衷是获取到读取文件的结果,成功后再读取下一个
//由于只要一创建实例就会立即执行创建时括号中的那个函数,需要先封装一下
function getFileData (){
    return new Promise(function(resolve,reject){
        //这里执行异步操作
        fs.readFile(path.join(__dirname,'file/2.txt'),'utf-8',function(err,data){
            if(err) return reject(err)
            resolve(data)
        })
    })
}
getFileData(path.join(__dirname,'file/1.txt')).then((result)=>{
    console.log("这是成功的回调"+result);
} , (err)=>{
    console.log("这是失败的回调"+err);
})
