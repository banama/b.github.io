---
layout: default_post
title: java web环境配置和Servlet实例HelloWorld 
categories: share
permalink: /share/servletFir.html
---

曾经一直对很”重“的东西很痛恨，也可能因为自己懒...因此一直对微软的东西不感冒，学校的网速下载个VS都有种想死的感觉。对于java也是同样的感觉，eclipse让我曾经望而却步。其实我一直有种想法，感觉java适用于企业级的应用，而我内心不想做一个螺丝钉，我喜欢做一些快速的，magic，有掌控力的工作，当然也有可能是飘渺的成就感在作祟。但是java越来越火，总有他的原因，一个优秀的程序员不该有偏见，不是吗？练级之路不应惧怕任何挑战！

以前一直做动态语言的web开发，对于java web刚了解刚开始有一点难以适应，同学推荐下，先借了本jsp的书浏览了一下，起初感觉jsp向一个模板引擎，不过强大的是只是这个“模板引擎”就可以开发出一个纯正血统的动态网站。不过感觉是有点不太科学。渐渐了解到，java web的MVC的开发中，jsp的角色更像V，而MC则分别是javabean和servlet。

java开发的IDE了解了很多，能力有限，搞定不了太多东西，还是老老实实用eclipse了，对于收费的myeclipse，一方面，因为的收费的，实在不想去破解，另一方面真的再懒得去下载配置...下面就讲讲eclipse 配置以及servlet HelloWorld，好记性不如烂笔头，东西多了总要总结一下，记一记。

###环境搭建
我的系统是Ubuntu 13.10，安装eclipse版本是3.8，打开发现没有菜单栏，google才知道这好像是一个bug，最简单的解决方法，`env UBUNTU_MENUPROXY = (eclipse path)`, 命令行打开问题即解决。

为了更方便，eclipse的自动补全还需设置一下。Window => Prefenrence => java Editor => Content Assist ,在Auto Activation可按需求设置。

eclipse进行web开发是要安装插件的，具体操作 Help => Install New Software, 打开窗口,在work with filter中选择All Aailable Sites, 然后打开Web、Xml、Java EE...那一项，选中`Dail java persistenence Tools系列`  `Eclipse * Developer Tool`  `JST Server Adapter Extensions`
安装，重启eclipse。

安装tomacat服务器，tomacat安装非常简单，官网下载，解压，进入目录。执行./bin/startup.sh，打开浏览器输入`127.0.0.1:8080`,进入tomcat主页证明tomcat可以正常运行。为了开发web应用方便，需要在eclipse配置tomcat。 Window => Preferences => Server => Runtime Environment ,add 即可添加tomcat服务器，切记版本选择和自己安装tomcat版本相同。

到此环境配置已经基本完成，接下来实现第一个 servlet helloworld。

###实例

new => othoer => server 创建服务器

接下来创建web 工程，因为自己是一个菜鸟，网上很多教程eclipse版本不一样，所以走了不少弯路，下面说说我的版本的实现过程
网山很多教程，new => tomcat project ,我的版本没有这个选项，在这里，选择 new => other => Dynamic Web Project ,按要求填写项目信息，假如工程名字为Servlet，一直next，知道最后勾选添加web.xml,finish。 

实现第一个servlet实例，New => Servlet ,输入如下代码

<pre><code>
 package servlet;
 
 import javax.servlet.http.HttpServlet;

 public class Hello extends HttpServlet {
 
	private static final long serialVersionUID = 1L;
	public void doGet(HttpServletRequest request, HttpServletResponse response)
	 		throws IOException, ServletException {
		response.setContentType("text/html");
		PrintWriter writer = response.getWriter();
		writer.println("Hello");
	}
 } 
</code> </pre>

打开 WebContent -> WEB-INF -> web.xml, 增加servlet

<pre>
&lt;servlet&gt;
	&lt;servlet-name&gt;Hello&lt;/servlet-name&gt;
	&lt;servlet-class&gt;servlet.Hello&lt;/servlet-class&gt;
&lt;/servlet&gt;
&lt;servlet-mapping&gt;
	&lt;servlet-name&gt;Hello&lt;/servlet-name&gt;
	&lt;url-pattern&gt;/Servlet/HelloWorld&lt;/url-pattern&gt;
&lt;/servlet-mapping&gt;
</pre>

其中servlet-class 是确定的，而servlet-name则可以自己命名。

接下来可以运行了，不过要怎么做呢？很简单，选中工程，run as 选择server，然后打开浏览器输入`127.0.0.1：8080/Servlet/Servlet/HelloWorld`

404？比忘了server.xml,打开服务器的serverl.xml ，拉到最后看`HOST`标签里的Context，有没有关于Servlet的`Context`，如果没有，你需要写入

``` <Context docBase="Servlet" path="/Servlet" reloadable="true" source="org.eclipse.jst.jee.server:Servlet"/>```

然后再次Run as 选择server，打开浏览器输入`127.0.0.1：8080/Servlet/Servlet/HelloWorld`，页面应该就可以正常访问了。

###Ps
***

* eclipse生成的servlet文件不用设置web.xml即可访问，分析他的代码发现有这一行代码`@WebServlet(path)`,其功能应该类似与python中的route装饰器。	

