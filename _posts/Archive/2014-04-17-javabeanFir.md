---
layout: default_post
title: javabean实例及数据库点滴
categories: Archive
permalink: /Archive/javabeanFir.html
---

Javabean可以对数据进行良好的封装，可以理解微MVC模式的model，这篇文章属于HelloWorld级别，没有什么高深内容，只有点滴。

与数据库打过一些交道，甚至配置过略微高大上的Mysql-Cluster，但是从心底里对数据库操作不是那么知根知底，不算一个合格的DBer。我一直认为，作为一个程序员，三天不敲代码就会手生，数据库的东西又是琐碎，更是如此，许久不碰，不生才怪。

###数据库
* 安装mysql

  其中包括两部分，mysql-server和mysql-client， apt-get install * 很简单

  安装成功，首先启动mysql-server，执行命令  `/etc/init.d/mysql start`

* mysql-client是mysql的命令行管理，执行命令  `mysql -u root -p`,即可进入root用户管理,默认状态下，root用户是没有密码的。

  为了安全，数据库一定要有密码，初始状态下设置密码，可使用命令`mysqladmin -u root -p password newpasswd `,也可使用此命令修改密码，按提示输入原来密码后设置成功。

  数据库的用户信息都存在mysql库的user表中，更新表中内容也可修改密码

  `UPDATE user SET Password = PASSWORD('newpass') WHERE user = 'root';`    `flush privileges；`

  以上两条命令即可更改表中密码信息，如果忘记了密码呢？也是通过修改表中信息来修改，可是没有密码无法登录数据库怎么办？

  有办法的，执行命令`mysqld_safe -skip-grant-tables &`  `mysql -u root`即可进入数据库，像风儿一样自由...


  在命令行执行命令非常方便，也有助于自己对数据库的了解，不过归根到底效率还是不高，对于mysql，相信有一个工具你会非常喜欢，phpmyadmin,这是一个网页管理工具，所以也是跨平台的，它依赖与apache，当然叶依赖与php.


* apache2使用也非常方便，执行命令`/etc/init.d/apache2 start`即可启动，打开浏览器，输入127.0.0.1，一切像想象的一样美丽，不会出现什么问题。


* phpmyadmin可以理解成一个网站，一个安装几乎不用做什么配置的网站，你只需要下载phpmyadmin，并解压到apache2的web根目录在/var/www/下即可，为了方便，建议改个名字，比如我的phpmyadmin的目录名就是phpmyadmin，那么在开启apache的情况下，直接访问127.0.0.1/phpmyadmin即可访问，输入帐号密码即可进行数据库操作。但在安装phpmyadmin之前也可能遇到什么问题，phpmyadmin混迹江湖这么多年，早已被吃透，如果你会google(我可不相信你不会)...相信没什么能难得倒你。

###Javabean
javabean为数据做了良好的封装，下面通过实例来看看是怎么封装的
首先在beans包建立Student.class

<pre><code>
package beans;
public class Student {
	private String stuno;
	private String stuname;
	private String stutest;
	public String getStuno() {
		return stuno;
	}
	public String getStuname() {
		return stuname;
	}
	public String getStutest() {
		return stutest;
	}
	public void setStuno(String stuno) {
		this.stuno = stuno;
	}	
	public void setStuname(String stuname) {
		this.stuname = stunama;
	}
	public void setStutest(String stutest) {
		this.stutest = stutest;
	}
}</code> </pre>

代码很简单，都是面向对象最最基本的东西，我可以看到分别有三个成员，以及他们的set和get方法。数据封装好了，怎么用？新建一个stu.jsp来调用。jsp的冗杂代码就不写了，写一针见血的。

<pre>
&lt;jsp:useBean id="stu" class="beans.Student" &gt;&lt;/jsp:useBean&gt;

&lt;%
	stu.setStuname("niuyichao");
	String str = stu.getStuname();
	out.println(str);
%&gt;

&lt;jsp:setProperty property="stuno" name="stu" value="niusir"&gt;&lt;/jsp:setProperty&gt;
&lt;%
	String stris = stu.getStuno();
	out.println(stris);
%&gt;

&lt;%String tests = request.getParameter("name"); %&gt;
&lt;jsp:setProperty property="stutest" name="stu" value="&lt;%=tests %&gt;" /&gt;
&lt;%
	String stris1 = stu.getStutest();
	out.println(stris1);
%&gt;
</pre>


首先看到`jsp:useBean`标签，他指明了调用javabean,class指向了我们的javabean，id你可以理解为实例化的一个对象。

代码中有三个对成员操作的例子

第一个，一目了然了，不过不推荐这种写法，因为jsp中包含了太多的java代码，这部是我们想要的。

第二个，运用`jsp:setProperty`标签执行了封装好的数据类中的set方法，其中`property`为成员名，`name`为实例化的对象的名字，`value`为值。

第三个其实和第二个差不多，不过这个扩展了request请求的值，这才是web开发的意义所在。

到此为止，javabean对于数据封装及调用的一些内容已经了解了，不过貌似没有涉及到数据库，别急，我们有专门对数据库操作的DAO(Date Access Object)类。

###数据库操作
首先建立一个beans包，在包中建立Conn.class,输入以下代码

<pre><code>
package dao;
import java.sql.*;
public class Conn {
	public static Connection getConn(){
		String url = "jdbc:mysql://127.0.0.1:3306/test";
		String user = "root";
		String pass = "niuyichao"; 
        Connection con=null;  
        try {  
            Class.forName("com.mysql.jdbc.Driver").newInstance();  
            con=DriverManager.getConnection(url, user, pass);  
            
        } catch (InstantiationException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        } catch (IllegalAccessException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        } catch (ClassNotFoundException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        } catch (SQLException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        }catch(Exception e){  
            System.out.println("数据库连接失败!!!"+e.getMessage());  
        }  
        System.out.println(con);  
        return con; 
	}
}
</code></pre>
Conn类中有一个成员函数，getConn链接数据库函数，链接一个数据库需要知道数据库的地址，端口，账户，密码等。
链接数据库在java中首先要实例化一个Connection对象，初始为空。其实java链接数据库很简单，核心的地方就在这两行代码
```Class.forName("com.mysql.jdbc.Driver").newInstance();```

```con=DriverManager.getConnection(url, user, pass);```

第一行是加载连接mysql的驱动，这是可能会报错

javax.servlet.ServletException: java.lang.ClassNotFoundException: com.mysql.jdbc.Driver

因为java原生不会带mysql驱动，所以我们需要去下载下来，解压放到自己想要的任意文件夹，然后右击工程 build path => Add External Archievs => (path) ，找到这个驱动库即可。

此时在你的控制台应该能看到类似于`com.mysql.jdbc.JDBC4Connection@574b19`，这证明你已经链接成功了，连接成功我们还需要读取数据，并在页面显示。
在beans包下建立Testdao.class,输入以下代码


<pre><code>
package dao;

import dao.Conn;
import beans.Student;
import java.sql.*;
import java.util.ArrayList;

public class Testdao {

	public static ArrayList query() throws Exception {
		ArrayList students = new ArrayList();
		String sqlString = "select id,stuname,test from student";
		Conn conn = new Conn();
		Connection con = conn.getConn();
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery(sqlString); 
		while(rs.next()){
			Student student = new Student();
			student.setStuno(rs.getString("id"));
			student.setStuname(rs.getString("stuname"));
			student.setStutest(rs.getString("test"));
			students.add(student);
		}
		rs.close();
		stmt.close();
		con.close();
		con = null;
		return students;
	}
}
</code></pre>


这个类实现的功能是连接数据库后，读取数据库信息，并以封装好的数据模型那样存储。因此首先我们需要导入dao.Conn和beans.Student。因为成员函数数据返回的是不是一个，所以，我们把它存为ArrayList。

首先实例化一个ArrayList用来存储返回值，初始化一个String存储sql语句，并实例化一个Connection对象，连接数据库。接下来代码就是将数据库读取出来的数据存为ArrayList，并返回，这一块也挺简单，涉及到Statement、ResultSet等sql接口。

当然我们需要事先建表，这个例子的建表sql语句如下

<pre>
create table student( 
	id int(12) not null, 
	stuname vachar(30), 
	test varchar(12)
);
</pre>

javabean的数据库操作到此位置基本的已经实现了，为了在页面中显示出来，我们建立一个jsp页面，输入以下代码

<pre>
&lt;%@ page import="java.util.*,java.sql.*" %&gt;
&lt;jsp:useBean id="stu" class="beans.Student" scope="page" /&gt;
&lt;jsp:useBean id="testdao" class="dao.Testdao" scope="page" /&gt;
&lt;%
	ArrayList students = testdao.query();
%&gt;

&lt;tr&gt;
	&lt;td&gt;id&lt;/td&gt;
	&lt;td&gt;name&lt;/td&gt;
	&lt;td&gt;test&lt;/td&gt;
&lt;/tr&gt;
&lt;% 
	for(int i=0; i &lt; students.size(); i++) {
		stu = (Student)students.get(i);
%&gt;
&lt;tr&gt;
	&lt;td&gt;&lt;%=stu.getStuno() %&gt;&lt;/td&gt;
	&lt;td&gt;&lt;%=stu.getStuname() %&gt;&lt;/td&gt;
	&lt;td&gt;&lt;%=stu.getStutest() %&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;%
	}
%&gt;
</pre>

javabean在jsp页面的调用前文已经讲过，不再细说。

ArrayList students = testdao.query()即可将数据库读取的结果返回到students，它是一个ArrayList,通过JSP表达式即可取值。

###总结
到此为止，你应该可以看到你的jsp页面上显示的为数据库的信息，看似挺麻烦，的确相比python代码可能会多出很多，但是核心的逻辑代码可能也就那么几行，加上eclipse强大的自动补全功能，如果熟练了，高效率快速coding自然不在话下。其实简单总结就两句话
*	javabean把数据库获得的数据封装好
*	jsp通过javabean把数据库封装好的数据显示出来。
