const path = require("path")

//第二步,在配置文件最上面导入webpack模块
const webpack = require('webpack')

//导入html-webpack-plugin插件,再去plugins创建插件对象
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    //手动指定入口和出口,路径要用path模块
    //entry 入口可以用相对路径或者绝对路径
    entry: path.join(__dirname,'./src/main.js'),
    //output 输出只能用绝对路径
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
        //配置热更新开启这里有三步
        //第一步:hot:true
        hot:true
        //第二步,在配置文件最上面导入webpack模块
        //第三步,在plugins节点中,创建热更新对象
    },
    //在plugins节点下创建插件对象
    plugins:[
        //开启器热更新第三步,在plugins节点中,创建热更新对象
        new webpack.HotModuleReplacementPlugin(),
        //创建html-webpack-plugin插件对象
        new htmlWebpackPlugin({
            //如果不传入配置项,还是会在服务器根目录下创建一个index.html,并且引用了bundle.js,但是index.html没有其他内容,空页面
            //创建一个内存中的html页面,其中会自动引入之前打包好放在内存中的bundle.js,可以查看网页源代码查看到
            template: path.join(__dirname,'./src/index.html'), //指定模板页面,可以使用相对路径或者绝对路径
            // filename:'index.html' //指定在内存中生成的页面的名称,默认就是index.html
        })
    ],
    module:{
        rules:[
            //css-loader是允许你将css文件进行编译,
            //style-loader 用于将css代码用js动态创建style标签插入到index.html页面中,让其起作用,减少请求外部资源的次数
            /* use 使用 loader时,顺序是固定的从右到左的加载 */
            /* 所以这里的style-loader 和css-loader的顺序不能颠倒 */
            {test: /\.css$/,use:['style-loader','css-loader']},
            /* 配置less文件 */
            {test: /\.less$/,use:['style-loader','css-loader','less-loader']},
            /* 配置scss文件 */
            {test: /\.scss$/,use:['style-loader','css-loader','sass-loader']},
            /* 配置图片 */
            {
                test: /\.(png|jpg|jpeg|bmp|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:81920 
                    }
                }]
            },
            /* 配置字体图标 */
            {test: /\.(eot|svg|ttf|woff|woff2)$/, use:['url-loader']},
            // 配置 Babel 来转换高级的ES语法
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, 
            { test: /\.vue$/, use: 'vue-loader' } // 处理 .vue 文件的 loader
        ]
    },
    /* resolve: {
        // alias 是别名的意思 
        alias: { // 修改 Vue 被导入时候的包的路径
          "vue$": "vue/dist/vue.js"
        }
    } */
}