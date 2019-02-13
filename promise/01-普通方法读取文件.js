const fs = require('fs')
const path = require('path')

//读取文件: fs.readFile(文件路径,'utf-8',function(err,data){})
//如果不写 'utf-8' 的编码格式的话,得到的是 Buffer 二进制数据,可以用 toString() 方法转化为 普通字符串
fs.readFile(path.join(__dirname,'file/1.txt'),'utf-8',function(err,data){
    console.log(data);
})