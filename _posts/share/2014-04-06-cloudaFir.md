---
layout: default_post
title: 初识Clouda 
categories: share
permalink: /share/cloudaFir.html
---

前言
----

以前喜欢在BAE折腾，也写了一点小东西托管在上面。前一段时间看到了百度轻应用，乍一看，挺有意思，于是乎开始用AppBuilder折腾了起来。整体看起来用BAB（BaeAppBuild，姑且允许我这么叫吧）生成一个轻应用门槛还不不高的，我选择用json数据生成的轻应用，研究了轻应用的json格式，写了个[小脚本](https://github.com/banama/BaeAppBuilder)来生成json数据，勉勉强强能够跑起来，但是归根到底百般不舒服，定制性也不高。
今天bae催帐...又进去bae转了转,看到clouda，最近也学了点nodejs，于是看了看。
clouda是基于nodejs的一个web框架，看了文档之后感觉clouda虽然为轻应用而生，不过我感觉这货就是一个实实在在的web框架，网上也有人称它有发展成nodejs的‘ROR’的潜力。下文为我学习过程中的一些细节上小问题，也算是笔记吧，大神请直接跳过。


##安装
* nodejs环境，管理工具，npm,nvm,nrm等管理工具
* Clouda

  安装Clouda `npm install -g sumeru`

  运行Clouda `sumeru init .my` 
  `cd my`  `sumeru start`  

  升级Clouda  `npm update -g sumeru`
  `sumeru update ./my`
* MongoDB
  
  `mkdir mongodb/data/db`
  
  `mongdb/bin/mongod -dbpath mongdb/data/db`
  
  `mongdb/bin/mongo`

Clouda依赖于mongdb，最近据说有个团队开发出了CloudaMysql插件

##初探
进入`my`工程,便生成clouda的目录结构，我们需要关注是`app`文件夹，这个里面是我们web应用的核心代码。透过[官方文档](http://cloudajs.org/docs),我们发现clouda是基于MVC模式的。进入app目录看到model、controller、view文件夹，是不是根据以前开发经验，有种熟悉的感觉？除此之外还有package.js、publish、server_config等目录,在官方文档都有很详细的说明，以上提到的功能是我接下来贯通MVC模式的最基本用到的，作者能力有限，此博客只做熟悉Clouda内容，抛砖引玉，稍微深入一点的东西还请大神写博文阐述。
接下来说说app目录下的文件，因为是MVC模式，所以显而易见，model、contrller、view分别是模型、控制器和试图，view用来存放模板文件，controller存放功能的逻辑代码，通过`render`可以渲染模板，model是模型，与数据库交互用到的就是模型，但是clouda的MVC比较特殊的一点是用到pubsub，即发布者/订阅者模式，这也是publish文件的作用。还有package和server_config分别是依赖包和服务器配置文件，下文详细介绍。

###发布者/订阅者
作为一个菜鸟，以前我个模式也知之甚少，通过查一些资料说说我的见解。发布者/订阅者，从字面意义上来讲，一个发送数据，一个接受数据。事实上也是这样的。publish以模型为依托，把从model模型获取的数据发布出去。而订阅者存在于controller中的subscribe，通过订阅发布者来获取代码。下面我们来看看代码，如何贯通这个mvc模式。

##实战

server_config/database.js为数据库配置文件，做好配置连接数据库

在moongdb建立collections，执行命令db.tests.insert("num":1)

model文件夹建立tests.js文件，输入以下代码

<pre><code>
  Model.tests = function(exports){
    exports.config = {
      	fields: [
    	   	{name: 'num', type: 'int'}
    	 ]
    }
  }
</code></pre>

tests为collections，可以理解为关系数据库中的表，fileds中内容为字段。

在publish文件下建立tests.js,输入一下代码.  

<pre><code>
  module.exports = function(sumeru){
      sumeru.publish('tests', 'pub-tests', function(callback){
          var collection = this;
          collection.find({}, function(err, items){
              callback(items);
          });
      });           
  }
</code> </pre>

其中代码中publish参数`tests`为modelName，与model/tests.js文件中Model.`tests`对应，`pub-tests`为publishName，与下文中subscribe的参数对应。

在controller目录目录下建立tests.js,一个控制器文件包含两部分，一部分是路由，一部分是逻辑函数。


sumeru.router.add是增加路由，其中pattern是路径，action对应下面逻辑函数。

App.tests中controller参数是两个对象，env，session。env绑定生命周期，session绑定用书数据，  `onload`作用加载数据，`onrender`作用是渲染模板，更多时态，请看文档，getMsg是一个接收者函   数，subcribe的参数`pub-tests`正是我们上文中所说的publishName，和pubsish函数中的第二个函数  对应，回调函数为实现一个订阅者，pub/sub模式的一个优点就是低耦合，这个回调函数可以通过`fin  d`实现选择性订阅。最后一点`session.bind`通过绑定数据，更方便地在模板中使用。

控制器中已经渲染到‘tests’,这里省略了扩展名。因此我们在view目录下建立teste.html,输入以下代码

这里就不说了，官方文档说的已经很清楚了，而且也有其他可能更为方便的方法，只需要记住一点‘tp  l-id’为我们controller中订阅者函数中已经绑定好的，即`session.bind`.

##总结
到此为止，整个MVC已经贯通了，活到`my`目录下，执行`sumeru start`即可运行。今天刚学的一点东西，作者能力有限，所以有些语言可能欠考究。本文涉及细节可能比较多，
都是我当时遇到的一些小问题，经验之谈。一方面作为百度的框架，因为文档用的汉语，所以看起来比以往的英文文档要顺畅很多。而且官方文档很详细，大家有开发经验直接看文
档应该也很简单。

