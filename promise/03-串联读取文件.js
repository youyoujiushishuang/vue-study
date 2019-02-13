const fs = require('fs')
const path = require('path')

// 需求,按顺序读取 1.txt  2.txt  3.txt
function getFileData (fPath,success,fail){
    fs.readFile(fPath,'utf-8',function(err,data){
        if(err) return fail(err)
        success(data)
    })
}
getFileData(path.join(__dirname,'file/1.txt'),function(result){
    console.log(result);
    getFileData(path.join(__dirname,'file/2.txt'),function(result){
        console.log(result);
        getFileData(path.join(__dirname,'file/3.txt'),function(result){
            console.log(result);
        })
    })
    
},function(err){
    console.log(err.message);
    
})