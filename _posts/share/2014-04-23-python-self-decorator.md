---
layout: default_post
title: Python装饰器中的self理解
categories: share
permalink: /share/Python-Decorator-self.html
---

问题起源于我读Flask的源码，对于self我知道它是类中对自己的引用，可是放到函数里是什么意思？如Flask中代码

<pre><code>
def setupmethod(f):
 	def wrapper_func(self, *args, **kwargs):
		if self.debug and self._got_first_request:
		#BaLaBaLa!
</code></pre>

函数的功能就不分析了，以后会专门写一系列分析Flask源码的文章，单纯关注setupmethod方法，它不属于任何一个类，却发现在这里出现了self。其实道理很简单且听慢慢道来。

整体观察代码，我们会发现setupmethod一个装饰器，他用于Flask类中的放大，知道了这一点，就有了思路：仿照他来构造一个类。

首先写一个函数func

 <pre><code>
def func(f):
     def dec (self, *args, **kw):
	    print self.a
		return f(self, *args, **kw)
	_func = dec
	return _func
</code></pre>

在写一个类

<pre><code>
class obj:
     def __i nit__(self, a):
		self.a = a
	@func
	def test (self):
		print 'yes!'
</code></pre>

实例化对象，执行test方法，输出如愿,即输出了a的值，也打印了'yes!'。

如此看来就不是那么神秘了，如果对基础很扎实的同学，可能一眼就看出来了，可是对于我等菜鸟还需要琢磨琢磨。

细心的同学会发现定义函数的时候，变量的定义不是必须的，如func函数中的self，这个和C不太一样，C的函数存储在静态内存区，编译的时候需要确定这些，以便于在初始化的时候分配内存。由此我们推测python的函数当你定义的时候，只要合乎语法规则，他不会做过多检查，这给了我们极大自由。至于深入的机制是怎样的，还需要脚踏实地去学习，不过暂时知道的也不妨碍我们接下来分析了。

装饰器其实就是一个高阶函数，比如上述代码中的func装饰过得test方法，可以理解为将test作为参数传入func函数中，即

`test = func(test)`

这样就不难理解了，上述类也可写成

<pre><code>
class obj:
    def __i nit__(self, a):
		self.a = a
	
	def test(self):
	    print self.a
		print 'yes!'
</code></pre>

其实python的装饰器从字面意义就可以理解了，就是把一段代码通过装饰被修饰函数，‘柔捏’成一个新函数，目的就是减少维护的复杂性。说的可能片面，欢迎拍砖。

到此为止，理解setupname函数的语法层面的东西就不是问题了。

其实就此来讲self并不是固定的，引申来想，也就是类的self也不是固定的，这只是一种良好的习惯。就类来说，对自己的引用你可以命名为任何名字(只要符合python的命名规则)，只要你定义了`__init__(ListenToYou)`方法，再实例一个对象的时候，ListenToYou就是方法内对子及的引用。

<pre><code>
class obj:
	def __i nit__(ListenToYou):
    		ListenToYou.s = '1'
 	def p(ListenToYou):
		prin t ListenToYou.s

test = obj()
test.p()
>>> 1
</code></pre>

