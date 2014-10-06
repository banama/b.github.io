---
layout: default_index
title: Archive
permalink: /index.html
---

<ul>
	{% for post in site.categories.share %}
	<li>
		{{ post.date | date_to_string }} <a href="{{ post.url }}">{{ post.title }}</a >
	</li>
	{% endfor %}
<ul>
    <!--
    {% for category in site.categories %}
    <li><a href="/categories/{{ category | first }}/" title="view all
posts">{{ category | first }} {{ category | last | size }}</a>
    </li>
    {% endfor %}
-->
</ul>
</ul>
