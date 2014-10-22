---
layout: default_post
title: Python 二进制文件、编码乱炖
categories: Archive
permalink: /Archive/python-byte-encode.html
---

以前不怎么注意细节，也踩过很多坑。在上次有心easyurl的时候一直有问题搞不明白，直到最近才完成easyurl和topdf。顺带着以前的编码问题在这里总结一下。

> 编码

首先提三个模块/内建函数

+ chardet
+ type
+ isinstance

后两个想必大家都比较熟悉，`type`可以判断一个对象的内容，在这里不严谨的考虑，一般会有`int`、`str`、`unicode`等。`isinstance`也是判断一个对象的类型，和`type` 不一样的是返回布尔类型，比如`isinstance(sr, bytes)`。模块`chardet`刚刚发现的，比较好用，用法如下：

<pre><code>
In [121]: import chardet

In [122]: sr = 'niu'

In [123]: chardet.detect(sr)
Out[123]: {'confidence': 1.0, 'encoding': 'ascii'}
</pre></code>

要知道对于字符串操作系统都是有默认编码的。拿一个汉字来说，linux默认编码是`utf8`，windows是`gbk`，那utf8和gbk到底是什么？(不严谨的说)他们是一种对字符编码的格式，字符集。ASCII是他们的子集。本篇博文我们拿linux来说事......

打开Python解释器，看以下代码
<pre><code>
In [127]: sr = '牛'

In [128]: chardet.detect(sr)
Out[128]: {'confidence': 0.505, 'encoding': 'utf-8'}

In [129]: sr = 'niu'

In [130]: chardet.detect(sr)
Out[130]: {'confidence': 1.0, 'encoding': 'ascii'}

In [131]: type('niu')
Out[131]: str

In [132]: type('牛')
Out[132]: str
</pre></code>
我们发现字符串对象`sr`无论是中文还是英文，他们的对象类型都是`str`，而编码却不同。我在这理解为，utf8编码和ASCII码，只是当ascii能胜任的编码会直接用ascii编码，否则会调用系统默认编码格式来编码。但这只是在命令行的情况。

Python文件的开头往往有一个`#-*- coding:utf-8 -*-`，他其实是在告诉解释器`我的编码格式是utf8`，有了这个“声明”，一般在代码中有中文注释也不会有问题，因为utf8是可以编码大多数自然语言的。但是如果去掉这个注释，出现ASCII字符集无法编码的字符，就会报错，如
<pre><code>
  File "~/9.py", line 11
    #你看不见我
          ^
SyntaxError: Non-ASCII character '\xe4' in file ~/9.py on line 11, but no encoding declared; see http://www.python.org/peps/pep-0263.html for details
</pre></code>

而在Python2中（Python专门对这方面做了改进），字符串只有两种对象类型，str和unicode。这个地方对于新手来说可能经常遇到乱码的问题，比如
<pre><code>
In [147]: sr = u'牛'

In [148]: print sr.encode('gbk')
ţ
</pre></code>
乱码的原因简单的来说，就是你在尝试把`utf8/gbk`的字符码尝试用`gbk/utf8`来编码，这当然不会输出期望的字符。也许不是有意的，但是这个问题一不小心就会出现，比如你把linux上自己写好的代码，发给windows系统同学看。因为linux默认编码为utf8，所以当出现中文，系统直接用默认编码`utf8`来编码，此时这个文件已经是utf8格式文件了，在windows打开的时候，windows会尝试用gbk解码，这时乱码就出现了。

但是只要了解python2中的编码问题，稍加注意，这个问题也是很容易避免的，比如你想把gbk编码的汉字无乱码输入
<pre><code>
In [154]: sr = u'牛'

In [155]: gsr = sr.encode('gbk')

In [156]: print gsr.decode('gbk')
牛

In [157]: print isinstance(gsr.decode('gbk'), unicode)
True

In [158]: print gsr.decode('gbk').encode('utf8')
牛
</pre></code>
这里只需牢记字符串的`decode`解码方法和unicode的`encode`编码方法就可以避免乱码问题。无非就是将unicode用正确的编码方式编码出来，将字符串以正确的解码方式解码成unicode。
如果没分清就会出现一下错误
<pre><code>
UnicodeEncodeError: 'ascii' codec can't encode character u'\u725b' in position 0: ordinal not in range(128)

UnicodeDecodeError: 'ascii' codec can't decode byte 0xc5 in position 0: ordinal not in range(128)
</pre></code>

> 二进制文件

因为SAE没有写权限，所以在做easyurl和topdf两个项目时，因为都需要在线生成图片，图片的存储算是当时遇到一个比较难解决的问题，其实搞清楚一些细节，也是很容易解决的。

不管当时用到什么奇淫技巧，终归还是图片的二进制流和base64编码。
<pre><code>
	data:png;base64,iVBORw0KGgoAAAANSUhEUgAAAbwAAAG8AQAAAACNyy1yAAACyUlEQVR4nO2cQW7jMAxFPwfe0zfo/W8nnYCzICXRThadpGNVzheK1JH14AggaPKTthheGvXPaxxAkCBBgvcHpY8dAFBF9vjsfw/LFtsjwfXBDQC0+BcBUHeooQrUBPAIIeKEvGylPRK8BwgzgxoAqEHNBwAryMd+diwrC+2R4D3BCAPUoCYiMauPGdj8n0rw08EqcEfqYYCIhwRW/tsVCRL81tj8X/ebBg9Zix+3SNWkzbx9RYIE3wBr5PcAZId8GQD5spMOkJett0eCy4MbDt7S/ar45ziVj9+9IkGCr4PhKquISA9NzcxNFADUfHJkW6vtkeD6YGhWYZ8lpKqYbwtCvyphtGbUrAjOsdVsrk0+HWe77poFWNoqwcvBJPi7/0x+NWz4WB2IGdoqwavBYZPxtaDHA8mLRjkgzrJuRXCqvmp1NxxqqeKlfy3RITD5pxL8cPB8x49ZHe50pFQF6H0C9KsErwZHvNoTqJ71n3J/5FSLtkrwahDZPpFkq2GuZocIln6V4BxwA2CpW1W8wwrRrepBqgHQIt7EAoiWpfZI8B6g91p7c3URt9tWaYUaPOECLKy0WfJKeyR4D3Dc+odClULTnnBl8YoxAMHptYAQrLQnUKM0AMarBCeDyX/m0n9uCehGWzB8LG2V4NVgcqc4FALS7f5gw/SrBCeBUbdCFRtp1O5pVKtbGfojrujPXi20R4L3ADegNVcDrgOYWpilq1htaehXsXihPRK8B9ju7CcFwEcquea2QNatCE7UrGKM1ClOZUVr9GIxXiU4C9ThVKHxSGBYZpWDZvVTVyRI8N9HV/vPN/rHBaC+SvA3ge1dFt2L+gPXURSo0mZ+wU8l+Fng9nQ2cn8tqHtXCX7oigQJvjbO712R0aZS4M0qPryPpe5CfZXgHPCJDoDUqdKfB8wSAeNVgjPAp/f3bwy+g50gQYIEn4+/1i+fYs0d9RkAAAAASUVORK5CYII=
</pre></code>
把以上代码复制到浏览器里，看看会出现什么？图片的二进制base64编码，加上`头`，浏览器就是可以解析的。

再看以下代码
<pre><code>
In [175]: f = file('1.png','r')

In [176]: sr = f.read()

In [177]: chardet.detect(sr)
Out[177]: {'confidence': 0.0, 'encoding': None}

In [179]: isinstance(sr, bytes)
Out[179]: True

In [180]: type(sr)
Out[180]: str
</pre></code>
通过以上尝试，发现图片里面的内容使二进制的，但是也是字符串对象，同样字符集编码类型也是未知的，这是打印的话一定是乱码的，因为上一部分，我们知道，乱码是因为错误的字符集编码。

对于二进制的处理，可以看看这部分[文档](https://docs.python.org/2/library/binascii.html)

对二进制做处理
<pre><code>
In [184]: binascii.b2a_hex(sr)

In [185]: ascsr = binascii.b2a_hex(sr)

In [186]: ascsr
Out[186]: '89504e470d0a1a0a0000000d494844520000022900000099080200000065a43d150000000373424954080808dbe14fe00000001974455874536f66747761726500676e6f6d652d73637265656e73686f74ef03bf3e0000200049444154789ced9d774014c717c7df5e833bead19126088220a262c5aed8b06b448d628989d1a8a031d87b7e96d8bbd862030b1a5b34d658130c0444290a28e5384e7a2fd76f7f7f1c45657761cfb310e7f34fc838f7e6cd9bb73bbbb3bbf305402 ......

In [187]: chardet.detect(ascsr)
Out[187]: {'confidence': 1.0, 'encoding': 'ascii'}
</pre></code>
这样就很明了了，一开始我不知到怎么处理这些二进制内容，对象类型使字符串，打印又乱码。在这里对于二进制图片和base64之间相互转换也相当方便，`binascii.b2a_base64(sr)`就可直接base64编码了。

在PIL中，图片的`save()`方法会直接保存到当前目录下，如果不支持写权限，可以用`StringIO`模拟一个文件，来保存图片数据，在扔到云存储就可以了。
