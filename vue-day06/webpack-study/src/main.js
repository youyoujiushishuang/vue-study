/* 这里是要在index.html中引入的文件 */
/* 要写代码,先引入jquery,所以先用npm init -y 初始化,再 npm i juqery@1 -S下载版本1.?.?中的最高版本 */
/* 注意: 虽然juqery 号称兼容所有浏览器,但是它的最新版本3以上不是所有浏览器都兼容了,所以要下载版本1的 */
/*  import *** from *** 是ES6中导入模块的方式 但是这个语法浏览器不识别*/
/* jquery要向外暴露成员,用$接收 */
import $ from 'jquery'

/* 使用 import语法导入css样式表 , 不需要暴露成员,直接引用就行*/
import './css/index.css'
/* 报错: You may need an appropriate loader to handle this file type.*/
/* webpack 默认只能处理 JS 类型的文件, 要想处理其他类型的文件,需要手动安装一些合适的第三方 loader加载器 */
//1.安装包: npm i style-loader css-loader -D
//2.在 webpack.config.js配置文件中新增配置节点,叫module,它是一个对象,用于配置所有的第三方模块加载器, 这个对象里面有个rules 属性,是个数组,在这个数组中设置第三方模块的匹配规则

/* 导入less文件 */
import './css/aaa.less'

/* 导入 scss文件 */
import './css/main.scss'

/* 导入bootstrap.css文件,使用字体图标 */
import 'bootstrap/dist/css/bootstrap.css'

$(function(){
    $("li:odd").css('backgroundColor','green')
    $("li:even").css('backgroundColor','pink')
})