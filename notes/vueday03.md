## 1. 动画

### 1.使用过渡类名设置动画

在vue中的动画只是为了帮助用户理解应用程序而存在,并非是为了做出炫酷的特效

![](https://cn.vuejs.org/images/transition.png)

```js
//动画有六个类名(只需要掌握4个)
v-enter : 定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除

v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

v-leave-to: 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。
```

使用上面的类名制作动画

1.先将要执行动画的元素使用 `<transition></transition>` 标签包裹,这个标签会给包裹起来的元素增加或者移除样式

```html
<input type="button" @click="flag=!flag" value="按钮">
<!-- 需求: 点击按钮让h3显示隐藏切换 -->
<transition>
    <h3 v-if="flag">这是一个h3</h3>
</transition>
```

2.给四个类名设置样式

```css
 .v-enter{
 	opacity: 0;
 	transform: translateX(180px)
 }
 .v-leave-to{
	 opacity: 0;
 	transform: translateY(180px)
 }
 .v-enter-active,
 .v-leave-active {
 	transition: all 0.8s ease;
 }
```

另:

自定义前缀

```js
/*因为网页中可能有多个元素需要动画,没了不混淆,所以自定义前缀
在transition标签上加上一个name属性,其属性值就是 自定义的前缀
自定义类名优先级高于普通类名,便于与第三方css动画库结合使用*/

<transition name="flip">
    <h3 v-if="flag">这是一个h3</h3>
</transition>

//这里将 transition 标签的 name 属性设置为了 flip name设置过渡样式时的类名都不用默认的`v-` 开头了,而是 `flip-` 开头
```

### 2.animate.css 动画库

```
1. 引入 animate.css 库 
2. 在 transition 标签上添加属性 enter-active-class 设置入场动画 ; leave-active-class 设置离场动画
3.设置入场和离场动画的属性值都是类名,animated都是要加的,另一个是动画的类样式
```

```html
<transition 
enter-active-class="animated rollIn"
leave-active-class="animated rollOut">
	<h3 v-if="flag1">这是一个h3</h3>
</transition> 
```

```html
4. 还可以设置入场和离场动画的时间
	使用 :duration="毫秒值" 来统一设置
	<transition enter-active-class="bounceIn" leave-active-class="bounceOut" :duration="200">
      <h3 v-if="flag" class="animated">这是一个H3</h3>
    </transition>
```

```html
5.入场和离场动画的时间 也可以不同
<transition 
    enter-active-class="bounceIn" 
    leave-active-class="bounceOut" 
    :duration="{ enter: 200, leave: 400 }">
    <h3 v-if="flag" class="animated">这是一个H3</h3>
</transition> 
```



### 3.列表动画

```js
//对于使用v-for遍历数据渲染出来的列表,要对每个渲染出来的元素使用动画,就和上面的单元素的动画不一样了
```

```
需要使用transition-group标签进行包裹

1. 不同于 <transition>，<transition-group>标签会以一个真实元素呈现：默认为一个 <span>。你也可以通过 tag 特性更换为其他元素。
2. 过渡模式(mode属性)不可用，因为我们不再相互切换特有的元素。
3. 内部元素 总是需要 提供唯一的 key 属性值。
4. 通过appear属性可以让列表加载时执行动画

```

案例:

```html
<!-- html代码 -->
<transition-group tag="ul" appear name="flip">
    <li v-for="(item,i) in list" :key="item.id" @click="del(i)">
          {{item.id}}---{{item.name}}
    </li>
</transition-group>
```

```css
/* css代码 : 为 transition-group 包裹起来的元素设置动画 */
            .flip-enter,
            .flip-leave-to{
                opacity: 0;
                transform: translateY(80px)
            }
/*如果想让删除时的动画更加平滑, 删除一个元素后, 其他元素一起执行动画, 可以使用Vue内部封装FLIP动画队列后的 v-move 类样式来设置过渡效果 , 通过tag属性改变前缀后,已经是 .flip-move 了*/
            .flip-enter-active,
            .flip-leave-active,
            .flip-move{
                transition: all 1s ease;
            }
/*注意: 当执行删除动画时, 元素依然占位置, 所有需要在v-leave-active中设置绝对定位, 让元素脱离文档流实现完美的动画效果!!!*/
            .flip-leave-active{
                position: absolute;
            }
```





### 4.实现半场动画

```
用javascript钩子实现 , 也就是动画的生命周期函数
```



## 2.组件化开发

```
什么是组件?
组件的出现,就是为了拆分vue实例的代码量的,能够让我们以不同的组件,来划分不同的功能模块,将来我们需要什么样的功能,就可以去调用对应的组件即可
```

组件化: 对视图层的业务逻辑的划分,提高了视图层的复用性

模块化: 对controller的划分,提高了代码的复用性



### 1 创建组件的方法

注意事项: 

- 在注册组件名字的时候,如果组件名用驼峰命名的,在作为标签使用的时候,把大写字母改为小写,并将两个单词之间用 - 连接 ; 当然,如果命名时,没有用驼峰命名,就直接用祖建名作为标签名
- 组件必须注册之后才能使用
- 组件的模板`template`中有且只能有一个根节点

1.1 Vue.extend方法(不推荐, 太麻烦了)

```js
/* 创建组件的第一种方法 */
/* 1.创建组件 js代码:*/
	var com = Vue.extend({
		template:'<h1>这是创建的模板里面的html代码,无提示</h1>'
	})
    
/* 2.注册组件 js代码:*/
	Vue.component('mycom',com)

/* 3.使用组件:在vm实例控制的区域,用组件名作为标签名,写一对标签就行 html代码:*/
		<div id="app">
            <mycom></mycom>
        </div>
```

1.2 直接使用带有`template` 模板字符串的对象作为参数

```js
/* 1.注册组件 */
Vue.component('mycom',{
	template:'<h2>这是模板里的字符串</h2>'
})
/* 2.使用组件:在vm实例控制的区域,用组件名作为标签名,写一对标签就行 html代码:*/
		<div id="app">
            <mycom></mycom>
        </div>
```

1.3 在app区域外定义好模板后, 直接通过template属性引用

```js
 /* 1.注册组件 */
 Vue.component('mycom',{
 	template:'#tpl'
 })

/* 2.写模板,注意要在app区域以外写模板标签 */
<template id="tpl">
     <h3>这是在template模板标签中写的模板内容,有代码提示</h3>
</template>

/* 3.使用组件:在vm实例控制的区域,用组件名作为标签名,写一对标签就行 html代码:*/
		<div id="app">
            <mycom></mycom>
        </div>
```



