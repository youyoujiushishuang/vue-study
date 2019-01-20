## 5.vue的指令

vue中以 `v-` 开头的属性都是指令 , 双引号中的是变量(表达式,可以写js代码)

5.1 v-cloak

```
v-cloak  : 为了解决Vue模板渲染时的闪烁问题(vue.js引入是在html结构渲染之后再引入的,就会出现闪烁问题); 可以直接在</head>标签上面引入就可以彻底解决这个问题,所以这个指令不太重要
```

5.2 v-text

```
v-text : 相当于将表达式的结果渲染到标签上的innerText 属性上,哪怕标签里面有内容也会被覆盖
	跟差值表达式<p>{{...}}黑胡椒</p> 的区别是,标签内部差值表达式之外的内容也还存在, 且差值表达式只能用于元素内部内容的渲染,不能用于属性渲染
```

5.3  v-html 

```
v-html : 与v-text用法一样,区别是这个能渲染出标签,而 v-text 只会解析为纯文本
```

5.4 v-bind : 绑定原生和自定义属性的指令

```
v-bind : 是vue中提供的用于绑定原生和自定义属性的指令 <input v-bind:value="msg+'字符串拼接'"/>
	有简写形式, 将 v-bind删掉 直接用  :value="msg"
<input :a="msg" :value="msg+'bb'"/>
```

5.5 v-on : 用于提供事件绑定的指令

```
5.v-on : 用于提供事件绑定的指令
	另:在vue绑定事件中,可以携带参数
	<div v-on:click="show">点我</div>
	点击后会去找show方法,在methods中;
有简写形式 @ 
	<div @click="show">点我</div>
```

5.6 on-bind 的事件修饰符

```
6. on-bind 的事件修饰符
vue中为了方便开发人员处理一些简单的逻辑,例如阻止事件冒泡或者是默认行为,
	.stop  阻止事件冒泡,到此不再往外传
	.prevent 阻止默认行为发生
	.capture 添加事件监听器时使用事件捕获模式
	.self  只有点击当前元素自身时才触发事件,不会通过事件冒泡触发它身上的事件
	.once  事件只发生一次,之后无效
	
```

5.7 v-model

```
7. v-model  vue提供的双向数据绑定的唯一一个指令
v-bind 只能实现数据的单向绑定,从 M 到 V ,无法实现数据的双向绑定
v-model 实现数据的双向绑定,从 M 到 V , 还可以从 V 到 M ,即用户修改value属性时,自动同步回model层; 为什么不需要手动指定要绑定的属性呢? 由于用户与input 交互时,修改的是value值,所以v-model 只能绑定value属性 ; 
```

5.8 v-bind:class  在vue中动态绑定类样式

```js
8.v-bind:style    在vue中动态绑定类样式 
//现在style标签中定义好样式
			.red{
                color:red
            }
            .fontsize{
                font-size: 50px;
            }
            
//方法1:直接传入一个数组,虽然使用属性绑定了,但是依然写死了,没有实现动态的切换
	<h4 :class="['red','fontsize']">{{msg}}</h4>

//实现动态切换有两种方式,可以使用三元表达式或者对象来决定是否要动态添加数组元素

//方法2:在数组中使用三元表达式
	<h4 :class="['red', flag?'fontsize':'']">{{msg}}</h4>

//方法3:在数组中,将三元表达式改造为对象,提高代码可读性
	<h4 :class="['red', {'fontsize':flag}]">{{msg}}</h4>

//方法4:直接使用对象
	<h4 :class="classObj">{{msg}}</h4>
	在data中有 classObj 这个对象 {fontsize:true,red:false}
	//在为class使用v-bind绑定对象的时候,对象属性是类名,由于对象的属性名可以带引号,也可以不带,,所以这里没有引号

`总结:当类样式较多,而需要动态切换的类名只有一个,推荐(方法3)使用绑定数组的方式来实现动态切换,反之,当类样式较少,都需要切换时,使用(方法4)对象较为方便`
```



5.9 v-bind:style  行内样式的绑定

```js
//给style属性进行 v-bind 绑定
//1. 直接传入一个对象
<p :style="{color:'red','font-size':'20px'}"></p>
<h4 :style="classObj">{{msg}}</h4>
注意:当对象的属性名是合法的变量名时,可以不带引号,如果不是(有横线),就要加上引号

//2. 传入一个数组
<h4 :style="[classObj,classObj1]">{{msg}}</h4>

//在data中定义好对象:
data: {
        classObj: { color: 'red', 'font-weight': 200 },
        classObj1: { 'font-style': 'italic' }
      }
```

### 5.10 v-for 

```
v-for 原理:正在更新已渲染过的列表元素时,它默认"就地复用"策略

:key的作用就是将当前的数据与当前的DOM元素进行绑定,以后如果数据顺序发送变化,vue会在内部重新排序,然后渲染,这虽然会降低v-for的一部分性能(排序),但是影响不大

```

```
1.迭代数组
	<p v-for="(item,i) in arr">{{item}}</p>	
	
2.迭代对象
	<p v-for="(value,key,index) in obj">{{item}}</p>	
	
3.迭代数字,count从1开始
	<p v-for="count in 10">{{item}}</p>
```

```
注意:v-for中的key属性,在v-for循环渲染列表后,如果每个单项都有状态类型的表单元素,例如:checkbox ,此时

每次使用v-for时,用key来标识每一项的唯一身份,注意这个  :key="" 这里的值只能是字符串或者数值

```



5.11 v-if 和 v-show

```
v-if 和 v-show 的区别:
共同点:都是用于控制元素的显示和隐藏的
不同点:
	v-if 的特点是每次都会重新删除或创建元素; 有较高的切换性能消耗 ; 如果元素涉及到频繁的切换,尽量不要用v-if
	v-show 的特点: 每次不会重新进行DOM的删除和创建,只是切换了元素的display:none 样式 ; 有较高的初始渲染消耗(表达式是false,v-show还是会创建出来)
```

5.12 自定义指令(了解)

在Vue内部提供了很多内置指令: v-text, v-html, v-if, v-show, v-model ... 等等, 一切以v-开头的都是指令

除了内部提供的这些指令外, 开发者还可以自定义指令

1. 定义全局指令

   // 定义全局指令
       // 参数1: 指令名称, 不需要 v-
       // 参数2: 对象, 对象中有可以有5个函数 bind, inserted, update, componentUpdated, unbind
       //     5个函数就是所谓的钩子函数, 就是当指令应用到标签身上整个过程, 每个阶段所调用的函数
       Vue.directive('focus', {
         // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
         bind(el) {
           // console.log(el)
           // console.log('我被绑定了')
           // el.focus()
         },
         // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
         inserted(el) {
           console.log(el)
           // console.log('我insert到父节点了')
           el.focus()
         },
         // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
         update() {}
       })

2. 使用指令

   <input v-focus type="text" class="form-control" v-model="keywords">

**注意: 定义指令时不需要加 `v-` 使用指令时必须要加 `v-`**

### 定义私有指令

同私有过滤器, 在vm配置对象中, 和methods以及data同级的位置, 加入一个`directives`的属性:

```
directives: {
	focus: {
	  bind() {
	  },
	  inserted() {
	  }
	}
}
```

### 

## 6  es5中的迭代方法: 

forEach  some  findIndex reduce map every filter 都会循环遍历数组,这些方法都是对传统for循环的封装

在这些方法中,想要随时终止循环,不能用break ,

break终止循环只能用在 for switch  while 中

```js
// forEach就是单纯的循环遍历数组中的每一个元素, 不具备任何特点
this.list.forEach(item => {
	// 在forEach内部完成的循环
	console.log(item)
	if (item.id == 1) {
		// break
		// break只能用于 for  while  switch 中,其他地方不起作用
	}
})
```

```js
//some的特点: 当回调函数return true的时候会终止循环
this.list.some((item, i) => {
            // 循环取到一个数组元素就会调用一次回调函数
            // 在some函数内部完成
            // console.log(item)
            // if (i === 0) {
            //   return true
            // }
            if (item.id === id) {
              this.list.splice(i, 1)
              return true
            }
})
```

```js
//findIndex的特点: 当回调函数return true是 会结束循环并把当前遍历到的元素索引返回给调用findIndex的位置
          let index = this.list.findIndex(item => {
            if (item.id === id){ 
              return true
            }
          })
```



## 7.按键修饰符

```js
//当用户输入完数据后, 每次都需要点击添加按钮才可以将数据录入表中, 用户体验不佳, 最好能够当用户输入完数据后, 直接按回车立即录入表中
<input @keyup.enter="add" type="text"  v-model="name">
//@keyup.enter 的意思是给input绑定键盘抬起事件, 并且只有在回车键抬起时才会触发    

//所有键盘事件都有按键修饰符, 本质上其实是点的keyCode, 只不过Vue为了方便大家记忆, 内置了一些别名: enter , delete , tab , left , right , up , down , space , esc  
//想要使用其他的键,都要直接只用keyCode码,或者自定义全局按键修饰符
    @keyup.108="add"  //键盘上的108代表的是数字键盘上的enter
	//或者用 Vue.config.keyCodes.f1 = 112
```

## 8.过滤器

过滤器:就是对在数据渲染到页面上的前一瞬间 , 对数据进行加工,不改变原来的数据,再将过滤之后的返回值渲染到页面上 ; 过滤器可以串联

### 8.1全局过滤器

定义在Vue上的是全局过滤器,不管哪个vm实例中都可以使用 

```js
//Vue.filter('过滤器的名字',回调函数)
//回调函数中的参数:
    //第一个参数:管道符左边的内容
    //第二个参数:从第二个参数开始就是过滤器传过来的参数
Vue.filter('msgFilter',(data,str)=>{
     return data.replace('HelloWorld','你好世界')+str
})

// 过滤器还可以串联使用
// <p>{{msg | msgFilter('哈哈哈哈') | test}}</p>
```

### 8.2私有过滤器

定义在vm实例中的是私有过滤器只能在那个vm实例中使用 

```js
var vm2 = new Vue({
	el:"#app2",
	data:{},
	methods:{},
	//这个过滤器定义在app2中,只有在app2中才能使用
	filters:{
		dateFormat:function(date){
		}
	}
})

//注意:过滤器调用原则是:就近原则,如果全局过滤器和私有过滤器名称一致,就先使用私有的
```



##  9 生命周期函数

生命周期函数是指, Vue实例创建的过程中, 从出生到死亡每个阶段所执行的函数

一共有8个:

```
beforeCreate: 实例完全创建之前, 此时data和methods等数据都没有初始化, 不能使用

created: 实例已经创建完毕了, 此时data和methods等数据都可以使用了, 实例对象也可以访问 , 一般在这里就可以发送请求了

beforeMount: 模板在内存中编译完成了, 但是还未渲染到页面上,获取到的都是模板字符串

mounted: 编译好的模板完全渲染到页面, 用户最终看到的样子, 此时DOM元素也是最新的, 如果想操作DOM元素, 最好在这个生命周期函数中进行

beforeUpdate: 当data中数据改变时会触发, 此时页面上的数据并没有重新渲染, 只是data中的数据更新了

updated: 当data中数据改变后, 并将页面上的数据也更新完成后会触发, 此时data中的数据和页面上的数据是同步的

beforeDestroy: 当实例进入销毁阶段时执行的钩子函数, 此时Vue实例中的data/methods/filters/directives等都还可以使用

destroyed: 实例上的所有成员已经完全销毁, 无法使用了
```

### 