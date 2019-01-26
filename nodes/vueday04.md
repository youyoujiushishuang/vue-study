## 组件

### 1 组件的切换

```js
/*方法1. 用 v-if 和 v-else来控制组件的切换,只能切换两个组件
如果要展示多个组件的切换,就不能用布尔值进行判断了,可用number值,但是判断时和麻烦,要一直用 v-else-if */
<div class="contain">
     <input type="button" value="登录" @click="flag = true">
     <input type="button" value="注册" @click="flag = false">
     <login v-if="flag"></login>
     <register v-else></register>
</div>
```

```js
/*方法2: Vue提供了 component 标签,是一个占位符,可以展示指定名称的组件*/
<div class="contain">
    <input type="button" value="登录" @click="componentId = 'login'">
    <input type="button" value="注册" @click="componentId = 'register'">
        
    <component :is="componentId">	        </component>
</div>
```



### 2 组件切换 - 切换动画

```js
//组件切换动画和单元素动画一样,都是将元素包裹在 transition 标签之中,再设置类样式实现,可以通过name属性设置类名前缀, 组件也一样,不过还有一个mode属性
//通过mode属性设置组件切换时的模式 out-in  或者 in-out
<transition mode="out-in">
	<component :is="comName"></component>
</transition>
```

### 3 组件的传值

父子组件中不能共享数据

1 父组件向子组件传值

Prop 是你可以在组件上注册的一些自定义特性。  当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。

```js
//1 父组件引入子组件的时候通过属性绑定(v-bind:)的形式, 把需要传递给子组件的数据, 以属性绑定的形式,传递到子组件内部,供子组件使用
//2 子组件要把父组件传递过来的属性在子组件中的props中定义一下,才能使用
<div id="#app">
	<!-- 注意:这里的属性不能是驼峰命名,如果在props里面是驼峰,那么在绑定属性的时候,要用横线隔开,不要首字母大写 -->
	<com1 v-bind:parent-msg="msg"></com1>
</div>

var vm = new Vue({
	el:"#app",
	data:{
        msg:"这是父组件的数据"
	},
	methods:{},
    components:{
        com1:{
            template:"<h1> {{parentMsg}} </h1>",
        	data(){
            	return {}
        	},
        // props 这里面的数据都是父组件传递过来的数据 , 都是只读(单向下行绑定)的,不能重新赋值 , 就算重新赋值了,但是父组件里面的数据不会改变
       		 props:['parentMsg']
    	}
    }
})
```

props 中定义的数据都是单向下行的, 这是为了避免子组件中修改数据导致父组件或者其他子组件数据被篡改 , 所以vue中设计的时候就考虑了单向下行绑定 ; 

只能从父到子,父组件数据修改,所有子组件数据就自动修改,但是在子组件中修改数据,父组件和其他子组件数据不会修改

2 父组件向子组件传递方法

```js
核心原理是:自定义事件  v-on 指令
//将父组件的方法通过事件绑定的方式,传递给子组件 ,这样的话,子组件就可以通过this.$emit('事件名')来调用了
<div id="#app">
	<com1 @func="show"></com1>
</div>

<template>
	<input type="button" value="点击,调用父组件的show方法,并将子组件的数据当参数传递过去" @click="myclick">
</template>
var vm = new Vue({
	el:"#app",
	data:{
        msg:"这是父组件的数据"
	},
	methods:{
        show(agr){
            console.log("这是父组件中的方法"---agr)
        }
	},
    components:{
        com1:{
            template:"#tpl"
        },
        data(){
            return {
            }
        },
        props:['parentMsg'],
        methods:{
            myclick(){
            	// this.$emit( ) 
                //这里调用父组件函数的时候还传递了参数,参数是子组件的数据,这就完成了子组件向父组件传值
                this.$emit('func',123)
            }
        }
    }
})
```

3 子组件向父组件传值

核心原理: 自定义事件 v-on 指令绑定,将函数传递给子组件,子组件找个合适的时机触发事件并携带数据

1.先给子组件绑定事件, 'gotIt' 函数需要在父组件的 methods 中定义好

2.在子组件内部,某个时机调用 $emit()  方法触发父组件绑定的 foo 事件

​	$emit() 方法有多个参数: 

​		参数1: 要触发的事件名 ;   参数2及以后: 事件所需的参数

## ref--Vue中获取DOM元素和组件

ref : reference 引用

Vue在设计之初也考虑到了,很难完全避免DOM操作,只有在一些基础的业务处理上可以省去DOM操作,但是在一些特定场景下还是需要用到DOM操作,所以保留了一个 ref 的设计来获取DOM元素

```js
<h3 ref="myh3">哈哈哈,今天天气真好</h3>
在vm实例中挂载有refs对象,里面的键就是myh3 , 值是这个DOM元素
this.$refs.myh3  --->  h3标签这个DOM元素
```

这个方法也可以获取组件对象,那么在父组件也可以获取到子组件中的数据和方法

```js
<div id="app">
   <input type="button" value="获取子组件" @click="getson">
   <son ref="myson"></son>
</div>

<template id="tpl">
   <p>这是子组件</p>
</template>

<script>
    var vm = new Vue({
       el: '#app',
       data: {
          text:""
       },
       methods: {
          getson(){
              console.log(this.$refs.myson);
          console.log(this.$refs.myson.msg);       console.log(this.$refs.myson.sonshow);
                        
          }
       },
       components:{
           son:{
              template:"#tpl",
              data(){
                   return {
                      msg:"子组件的数据"
                   }
              },
              methods:{
                  sonshow(){                            console.log("这是子组件的方法");    
                   }
              }
           }
      }
  })
</script>
```



## 路由

前端路由 : 对于单页面应用程序SPA(single page application)来说 , 主要通过URL地址中的hash(#号) 来实现不同页面之间的切换, 同时 hash 有一个特点

后端路由 : 对于普通网站.所有的超链接都是URL地址,所有的URL地址都对应服务器上对应的资源

1 路由的基本使用

```js
//1. 在 vue.js 后面引入 vue-router.js

//2. 引入文件后,在window全局对象中就有了一个 路由的构造函数,叫做 VueRouter

//创建组件模板对象
var login = {
      template:"<h1>这是登录组件</h1>"
}
var register = {
      template:"<h1>这是注册组件</h1>"
}

//3. 创建路由对象
 var routerObj = new VueRouter({
     routes : [		//路由匹配规则
     	//每个路由规则,都是一个对象,这个规则对象身上,有两个必须的属性:
     	//属性1:  path  表示监听 哪个路由链接地址
     	//属性2: 是component , 表示路由是前面匹配到的path , 则展示 component 属性对应的那个组件
     	//注意: component的属性值,必须是一个组件的模板对象,不能是组件的引用名称
     	{path:'/', component: login},
         //上面访问根路径到了登录页面也可以,但是没有点击登录页面的样式了,所以使用路由重定向,
     	{path:'/', redirect: '/login'},
     	{path:'/login', component: login},
     	{path:'/register', component: register},
         
     ],
     linkActiveClass:"myActive"  //修改激活的类名,在mui或者bootstrap框架中自带了当前高亮的类名,将路由的高亮类名跟框架的高亮类名改成一样的,就不用自己写样式了
 })
 
//4.将创建的路由对象注册到vm实例上
	var vm = new Vue({
        el:"#app",
        data:{},
        router: routerObj
    }
    
//5. 在页面上展示 vue-view 标签,就是一个占位符, 这个标签里面就是你的路由匹配到的组件
<div id="app">
    /*<a href="#/login">登录</a>
      <a href="#/register">注册</a> */
//vue-router还提供了专门的标签写路径,默认渲染成 a 标签 还可以用tag属性改变 , 另外还自带点击哪个就自动给哪个添加类名,可以轻松排他高亮
    <router-link to="/login"> 登录 </router-link>            
    <router-link to="/register"> 注册</router-link>            
	<router-view></router-view>
</div>

                     
//这里没有注册组件, 我之前注册组件是为了在模板中使用<login></login> 这样的方式使用
                     
//6. 要想切换组件的时候有动画,还是向之前的单元素一样
<transition>
     <router-view></router-view>  
</transition>
```

