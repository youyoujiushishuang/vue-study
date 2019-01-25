### 2 路由的传参

1 使用 `query` 在路由中使用查询字符串('/login?id=2') 传参,不用修改路由中的path属性 ;  用 this.$route.query 可以获取到参数,是一个对象 {id:2}

```js
// 1 定义路由
var router = new VueRouter({
    routes:[
        {path : '/login' , component : login},
        {path : '/register' , component : register},
    ]
})

/* 2 切换组件时携带参数*/
<router-link class="li-list" v-for="item in list" :key="item.id" tag="li" :to="'/detail?id='+item.id">
         <h4>标题: {{item.title}}</h4>
         <p>标题: {{item.content}}</p>
</router-link>

/* 3 接收参数 */
<template id="detailtpl">
     <!-- 1.使用 query 传参来接收参数 -->
     <h1>这是详情页---{{$route.query.id}}</h1>
</template>
```

2 使用 `params`传参,需要修改路由的匹配规则,严格按照此规则来定义路由,不然跳转不了 ; 用 this.$route.params 来获取传递过来的参数

```js
// 1 定义路由
var router = new VueRouter({
    routes:[
        {path : '/login' , component : login},
        {path : '/register/:id' , component : register},
    ]
})

/* 2 切换组件时携带参数*/
<router-link class="li-list" v-for="item in list" :key="item.id" tag="li" :to="'/detail/'+item.id">
         <h4>标题: {{item.title}}</h4>
         <p>标题: {{item.content}}</p>
</router-link>

/* 3 接收参数 */
<template id="detailtpl">
     <!-- 使用 params 传参来接收参数 -->
     <h1>这是详情页---{{$route.params.id}}</h1>
</template>
```

### 3 路由嵌套

```html
<div id="app">
    <!-- router-link 提供了专门的标签写路径,可以添加类名,自己写排他高亮的样式 -->
    <router-link to="/account">Account</router-link>
    <!-- 路由匹配到的组件会在下面的这个标签中展示出来 -->
    <router-view></router-view>
 </div>

<template id="tmpl">
    <div>
      <h1>这是 Account 组件</h1>

      <router-link to="/account/login">登录</router-link>
      <router-link to="/account/register">注册</router-link>

      <router-view></router-view>
	</div>
</template>
```

```js
/* 定义组件 */
var home = {
    template:"#tpl"
}
var login = {
    template:"<h3>这是登录组件</h3>"
}
var register = {
    template:"<h3>这是注册组件</h3>"
}

/* 配置路由 */
var router = new VueRouter({
    routes:[
        //定义父组件中的子组件的路由:
        {
            path:'/home' ,
            component: home , 
            //这里用children 属性实现子路由 注意这里的path值不要前面的 / ,否则会以根路径去请求 
            children : [
                { path:'login' , component: login},
                { path:'register' , component: register}  				//或者这样写也可以:
                { path:'/home/login' , component: login},
                { path:'/home/register' , component: register} 
            ]
        }
    ]
})
var vm = new Vue({
    el: '#app',
    data: {

    },

    /* 注册组件 */
    components:{
        home,
        login,
        register
    },
    /* 注册路由 */
    router
})
```





### 4 命名视图

一条路由显示多个组件,并安排每一个组件的位置

```js
//1. 定义路由
var router = new VueRouter({
    routes:[
    //在一条路由中,定义多个路由
        {path:'/', components:{
            'default' : header,
            'left' : leftBox,
            'main' : mainBox,
        }}
    ]
})

//2.挂载路由,定义路由
//3. 展示路由
	<div id="app">
	/* 如果不加name属性,就都是展示默认的组件,展示三个header组件 */
		<router-link></router-link>
		<router-link name="left"></router-link>
		<router-link name="main"></router-link>
	</div>
```



## 15  watch   computed  methods

### 1 watch 监视数据的变化 

--> 是vm 实例中的属性 , 可以监视指定数据变化, 任何处罚这个watch中对应的function 处理函数

```js
var vm = new Vue({
    el:"#app",
    data:{
        msg:123
    },
    watch:{
        //方法名需要和监视数据同名,且监视的数据在data中定义了
        'msg':function( newVal , oldVal){
            console.log('这是新数据: ' + newVal)
            console.log('这是旧数据: ' + oldVal)
        }
    }
})
```

### 2 watch 监视路由的变化

--> 可以监视vm 实例上的数据 , 比如说 路由的  this.$route 这个对象

```js
var vm = new Vue({
    el:"#app",
    data:{
        msg:123
    },
    watch:{
    	//监听路由的改变
    	'$route.path':function(newVal , oldVal){
            if(newVal == '/login'){
                console.log('欢迎进入登录页面')
            } else if(newVal == '/register'){
                console.log('欢迎进入注册页面')
            }
    	}
    },    
})
```



### 3  computed  计算属性

```js
var vm = new Vue({
    el:"#app",
    data:{
        aa:11,
        bb:22,
        //msg:123
    },
    watch:{},
    computed:{
        //1 计算属性虽然看起来是一个方法,但是在引用的时候,一定不要用()去调用,直接把它当做普通属性使用
        //2 只要计算属性这个 function 内部,所用到的任何 data 中的数据发生了变化, 就会立即重新计算这个计算属性的值
        //3 计算属性的求值结果,会被直接缓存起来,方便下次直接使用,如果计算属性方法中的数据没有任何改变, 则不会对计算属性重新求值
        //4 这个计算属性默认是只读的,不能手动改变,毕竟是return回来的
        //5 在data中定义了的属性名, 在computed中不能定义重名属性,否则会冲突,报错
        'msg':function(){
            return this.aa + '-' + this.bb
        }
    }
}) 
```

### 4 watch  computed  methods  三者的区别



## 16 webpack--模块化工具

webpack 是前端的一个项目构建工具,它是基于 Node.js 开发出来的一个前端工具

### 1 安装 webpack  

```
npm i webpack -g  //全局安装
```

2 导入其他模块  import

```
import $ from 'jquery'
这是 es6 的语法, 浏览器可能不识别,有兼容性问题
```

3  用webpack 打包

```
webpack  源文件  --output  目标文件   webpack 版本4的写法
webpack  源文件  -o  目标文件
//可以把浏览器不支持的语法变成支持的语法,解决兼容性问题
此时的模式默认是 production 上线模式  ,文件都已经压缩;
还有另外一个模式 development 开发模式
要想设置开发模式,:
webpack  源文件  -o  目标文件 -d
```

