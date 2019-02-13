const fs = require('fs')
const path = require('path')

// 需求,封装一个函数,传入文件路径就可以读取文件内容
/* function getFileData (fPath){
    fs.readFile(fPath,'utf-8',function(err,data){
        if(err) return err.message
        console.log(data)
    })
} */
// console.log(555)
// getFileData(path.join(__dirname,'file/1.txt'))

//这里先输出 555  再输出 111 因为读取文件和发送请求一样时异步操作,代码执行到异步操作的时不会立刻执行它
//而是会将异步操作放到事件队列中,等到栈中的函数全都执行完毕之后,才会来执行事件队列中的函数
//注意: 只要是耗时操作都会先放到事件队列中去,比如: 发送请求,读取文件,定时器 

//上面疯转的函数只能讲结果在控制台打印出来,显然不是我们想要的,我们需要获取到结果
//而且异步操作的结果不能直接 return 出来 , 因为它并不是立马就执行的,以前我们发送ajax请求的时候,
//获取异步请求的结果是在 success 回调函数中获取,我们仿造这个做
function getFileData (fPath,success,fail){
    fs.readFile(fPath,'utf-8',function(err,data){
        if(err) return fail(err)
        success(data)
    })
}
getFileData(path.join(__dirname,'file/1.txt'),function(result){
    console.log(result);
    
},function(err){
    console.log(err.message);
    
})