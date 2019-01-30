/* 在webpack构建中的项目中使用vue框架 */
/* 下载 vue 框架,并在main.js中导入 */
/* 下载 vue-loader 解析 .vue为后缀的文件,在webpack.config.js中进行规则匹配 */
/* 下载 vue-template-plugin 插件,并在 webpack.config.js中进行插件的配置*/

// import Vue from 'vue'
// import Vue from '../node_modules/vue/dist/vue.js'
/* 报错了: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build. */
/* 这是因为通过npm下载的vue的包,导入的时候,默认是导入的是vue.runtime.common.js,而不是vue.js
这个可以在node_modules/dist/vue/package.json的main配置项中找到:
 "main": "dist/vue.runtime.common.js", 
这个导入的文件,功能并没有vue.js的功能完全,解决方法有:
1. 可以通过修改这个配置项将它改成vue.js: "main": "dist/vue.js",

2.在导入vue时,直接导入vue.js:
import Vue from '../node_modules/vue/dist/vue.js'

3. 在文件中设置:
resolve: {
    alias: { // alias是别名的意思 这里是 修改 Vue 被导入时候的包的路径
      // "vue$": "vue/dist/vue.js"
    }
}*/

/* 我们通常使用第三种方法解决 */

var vm = new Vue({
    el:"#app",
    data:{
        msg:"这是bm实例控制的区域"
    },
    methods:{

    }
})