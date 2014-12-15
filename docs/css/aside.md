---
layout: post
---

#aside

> aside 是侧边栏。Mob 支持两种形式的侧边栏。一个是进入时覆盖的侧边栏，一个是进入时推原来页面的侧边栏

* 默认侧边栏

{% highlight html %}
<div class="page-content"></div>
{% endhighlight %}

* 进入时push的侧边栏

{% highlight html %}
<aside class="aside aside-push aside-right" data-bind='.page'>
{% endhighlight %}
