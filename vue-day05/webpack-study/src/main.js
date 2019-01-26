/* 这里是要在index.html中引入的文件 */
/* 要写代码,先引入jquery,所以先用npm init -y 初始化,再 npm i juqery@1 -S下载版本1.?.?中的最高版本 */
/* 注意: 虽然juqery 号称兼容所有浏览器,但是它的最新版本3以上不是所有浏览器都兼容了,所以要下载版本1的 */
/*  import *** from *** 是ES6中导入模块的方式 但是这个语法浏览器不识别*/
import $ from 'jquery'
$(function(){
    $("li:odd").css('backgroundColor','red')
    $("li:even").css('backgroundColor','green')
})