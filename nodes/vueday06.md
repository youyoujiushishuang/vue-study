## webpack的使用

### 简介

四个核心概念:

1. 入口
2. 输出
3. loaders (加载器)
4. plugins (插件)

在项目中使用webpack打包工具,减少二次请求,将页面中的js , css , scss , less , 图片,字体图标等都进行打包 

### 1- webpack的基本使用

​	1.安装包,webpack中安装的包全都在本地开发依赖环境中  --dev /  -D

```
npm i webpack webpack-cli webpack-dev-server -D
```

### 	2.在main.js中导入需要编译打包的文件

用ES6中的模块化语法导入文件,浏览器识别不了这种高级语法,用webpack可以将之转化为ES5的语法

```js
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
```

### 3  用webpack 打包

```
webpack  源文件  --output  目标文件   webpack 版本4的写法
webpack  源文件  -o  目标文件
//可以把浏览器不支持的语法变成支持的语法,解决兼容性问题
此时的模式默认是 production 上线模式  ,文件都已经压缩;
还有另外一个模式 development 开发模式
要想设置开发模式,:
webpack  源文件  -o  目标文件 -d
//这样有缺点,只要文件一改变,就要重新打包
```

### 4 直接用webpack.config.js,不用手动指定入口和输出

```js
直接在项目根目录创建一个 webpack.config.js文件
在配置文件中:
	module.exports = {
        //手动指定入口和出口,路径要用path模块
        //entry 入口可以用相对路径或者绝对路径
        entry: path.join(__dirname,'./src/main.js'),
        // output 输出只能用绝对路径
        output:{
            path:path.join(__dirname,'./dist), //指定打包好的文件
            filename:'bundle.js'  //指定输出的文件的路径
        }
	}
配置完成后,再次修改项目之后,直接在终端运行 webpack 就可以自动刷新了,不用再手动指定入口和出口
```

### 5 webpack-dev-server  实现 实时编译打包

实现边改代码,实现实时刷新,不需要再在终端输入指令,直接打开浏览器刷新就行

```js
//使用 webpack-dev-server 这个工具,实现自动打包编译的功能
//运行 npm i webpack-dev-server -D 把这个工具安装到项目本地开发依赖,上线之后不用这个工具,如果是-S安装到本地就是上线之后也要用
//安装完之后,这个工具的用法和 webpack 命令的用法完全一样
//在终端输入 webpack-dev-server 报错,无法把它当做脚本命令.在终端中直接运行,(只有那些安装到 全局的工具)
//在package.json 中的"scripts"节点下编写一些项目中用的脚本, "dev":"webpack-dev-server" , 之后运行 npm run dev
//webpack-dev-server 依赖于 webpack@^4.0.0,所以不管你之前有没有全局安装,项目中都要再安装一遍
```



注意: 此方式不需要全局安装webpack , 但是需要在每个项目中的开发依赖环境中安装 webpack 和 webpack-cli  , 都是 npm i xxx -D进行安装 , 而不是 npm i xxx -S    

### 6 总结webpack的使用

```js
//1. 一次性安装三个包: npm i webpack webpack-cli webpack-dev-server -D
//2. 在package.json的scripts节点下新建一个脚本:
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "dev":"webpack-dev-server"
  }

```

第一次运行了devServer的时候,将入口文件打包编译,放在服务器根目录下与输出文件名同名的文件,所以在项目中引入时,也要引入服务器根目录下的输出文件,而不是物理磁盘中的文件

每次修改了webpack的配置文件 webpack.config.js 之后,都要手动重新运行 npm run dev

设置运行命令之后自动打开浏览器,项目托管到3000端口 , 将src托管为项目根目录 , 设置热替换(不重新编译整个bundle.js,只是打补丁)

"dev":"webpack-dev-server --open --port 3000 --contentBase ./src --hot"

上面的关于devServer的指令都可以放在配置文件webpack.config.js 中,这是官方推荐的,这里面可以写注释(虽然麻烦,但是推荐这样做)

```js
const path = require("path")

//第二步,在配置文件最上面导入webpack模块
const webpack = require('webpack')

module.exports = {
    //手动指定入口和出口,路径要用path模块
    //entry 入口可以用相对路径或者绝对路径
    entry: path.join(__dirname,'./src/main.js'),
    // output 输出只能用绝对路径
    output:{
        path:path.join(__dirname,"./dist"), //指定打包好的文件
        filename:'bundle.js'  //指定输出的文件的路径
    },
    mode:"development",
    //在配置文件中配置devServer的指令
    devServer:{
        open:true,
        port:3002,
        contentBase:'./src',
        //配置热替换开启这里有三步
        //第一步:hot:true
        hot:true
        //第二步,在配置文件最上面导入webpack模块
        //第三步,在plugins节点中,创建热替换对象
    },
    //在plugins节点下创建插件对象,在webpack中装插件都是这个分数
    plugins:[
        //开启器热替换第三步,在plugins节点中,创建热替换对象
        new webpack.HotModuleReplacementPlugin()
    ]
}
```

### 7 安装html-webpack-plugin

目前bundle.js已经托管到内存中了,但是index.html还是物理磁盘上的文件,而且每次还需要通过contentBase来指定托管的根目录,程序员还需要操心bundle.js的路径问题

下载插件 html-webpack-plugin,将物理磁盘上的HTML页面生成在内存中的HTML页面,并且将我们打包好的bundle.js文件在页面中自动引用了,所以程序员不需要再操心bundle.js的引用问题了,写HTML的时候不需要引用bundle.js同样可以实现js的效果

1.装包:

​	npm i html-webpack-plugin -D

2.在配置文件 webpack.config.js 中导入

```js
//导入html-webpack-plugin插件,再去plugins创建插件对象
const htmlWebpackPlugin = require('html-webpack-plugin') 

```

3.安装插件

```js
plugins:[
    //开启器热替换第三步,在plugins节点中,创建热替换对象
    new webpack.HotModuleReplacementPlugin(),
    //创建html-webpack-plugin插件对象
    new htmlWebpackPlugin({
    //创建一个内存中的html页面,其中会自动引入之前打包好放在内存中的bundle.js
    	template: path.join(__dirname,'./src/index.html'), //指定模板页面
    	filename:'index.html' //指定在内存中生成的页面的名称
    })
]
```



### 8 loader加载器

#### 1 加载css文件

当我们在项目中写css文件时,要引入到页面中,又碰到了与js文件引入一样的问题,为了减少css的二次请求,我们需要将css文件也进行打包,但是 webpack 默认只支持 JS 文件的打包,所以我们需要安装第三方loader加载器来打包css文件

1 在 main.js文件中导入css文件

```
import './css/index.css'
```

2 安装包:

```js
npm i style-loader css-loader -D
//css-loader是允许你将css文件进行编译,
//style-loader 用于将css代码用js动态创建style标签插入到index.html页面中,让其起作用,减少请求外部资源的次数
```

3 在 webpack.config.js配置文件中新增配置节点,叫module,它是一个对象,用于配置所有的第三方模块加载器, 这个对象里面有个rules 属性,是个数组,在这个数组中设置第三方模块的匹配规则 

```js
module:{
    rules:[
        /* use 使用 loader时,顺序是固定的从右到左的加载 */
        /* 所以这里的style-loader 和css-loader的顺序不能颠倒 */
        {test: /\.css$/,use:['style-loader','css-loader']}
    ]
}
```

 

#### 2 加载 less 文件

1 安装包:(两个,一个是less可以在项目中使用less,一个是less-loader可以让webpack对其进行编译)

```js
npm i less-loader less -D
```

2 在配置文件的module节点中的rules属性中匹配规则

```js
module:{
    rules:[
        /* 配置less文件 */
        {test: /\.less$/,use:['style-loader','css-loader','less-loader']}
    ]
}
```

#### 3 加载 scss 文件

sass文件与less文件作用一样,都是预处理语言,要注意的是,现在的sacc升级为scss后缀了,但是加载器的名字还是sacc

1 安装包:两个,一个是node-sacc可以在项目中使用sacc,一个是sacc-loader可以让webpack对其进行编译)

```js
npm i node-sass sass-loader -D
//这里下载的两个包用npm下载很难下载下来,建议用cnpm下载,之后就只能一直用cnpm下载了
```

2 在main.js中导入scss文件

```js
import './src/main.scss'
```

3 匹配规则

```js
module:{
    rules:[
        {test: /\.scss$/,use:['style-loader','css-loader','sass-loader']}
    ]
}
```



#### 4 加载图片和字体图标 url-loader 

在项目的css文件中设置背景图或者直接插入图片时报错,webpack不支持 jpg后缀名

直接加载图片又会有二次请求,用url-loader可以在图片大小在某个限度一下时,将图片转换成 base64 encodedURL --二进制;  并将图片放在了服务器的根目录下,并对图片重新命名了

1 安装包(url-loader中依赖到了 file-loader)

```js
npm i url-loader file-loader -D
```

2 匹配图片规则

```js
module:{
    rules:[
        {
    		test : /\.(png|jpg|gif|bmp|jpeg)$/,
    		use:[
        		{
        			loader:'url-loader',
        			options:{
                		limit:81920 //限制图片大小为81920字节,也就是80kb,在这个大小以内的图片会被转化为二进制字符--base64
        			}
        		}
    		]
		}
    ]
}
```

3 匹配字体图标规则

```
import 'bootstrap/dist/css/bootstrap.css'
{
	//这里的后缀是bootstrap中的字体图标的后缀
    test : /\.(eot|svg|ttf|woff|woff2)$/,
    use:[
        {
        	loader:'url-loader'
        }
    ]
}
```

