---
title: 需要js的组件文档
layout: defaults
descript: 用到Javascript的复杂组件用法
permalink: /javascript.html
previous: components.html
previous_name: 组件文档
---

### Tab

#### 示例1

{% highlight html %}
<!-- Nav tabs -->
<ul class="nav nav-tabs">
  <li><a href="#home" data-toggle="tab">Home</a></li>
  <li><a href="#profile" data-toggle="tab">Profile</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div class="tab-pane active" id="home">...</div>
  <div class="tab-pane" id="profile">...</div>
</div>
{% endhighlight %}

#### 示例2

你可以仅使用HTML代码来实现tab切换效果，不需要写一行js代码。你只需要在html标签里标记<b>data-toggle="tab"</b>就能显示 mob样式的tab。                


{% highlight html %}
<nav class="navbar">
    <a href="#tab-1" data-toggle="tab"> tab 1 </a>
    <a href="#tab-2" data-toggle="tab"> tab 2 </a>
    <a href="#tab-3" data-toggle="tab"> tab 3 </a>
    <a href="#tab-4" data-toggle="tab"> tab 4 </a>
    <a href="#tab-5" data-toggle="tab"> tab 5 </a>
</nav>
<div class="tab-content">
    <section id="tab-1" class="tab-pane">
        tab 1
    </section>
    <section id="tab-2" class="tab-pane">
        tab 2
    </section>
    <section id="tab-3" class="tab-pane">
        tab 3
    </section>
    <section id="tab-4" class="tab-pane">
        tab 4
    </section>
    <section id="tab-5" class="tab-pane">
        tab 5
    </section>
</div>
{% endhighlight %}

#### 可调用的方法

{% highlight javascript %}
$().tab
{% endhighlight %}

事件:
<pre>
    - .show
    - .shown
</pre>

{% highlight javascript %}
    $('a[data-toggle="tab"]').on('shown', function (e) {
            e.target // activated tab
            e.relatedTarget // previous tab
    })
{% endhighlight %}


###Modal

#### 示例1

[查看例子](examples/modal.html)

{% highlight html %}
<!-- Button trigger modal -->
<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
{% endhighlight %}

#### 示例2

{% highlight html %}
    <div class="modal-wrapper">
        <div id="offlineTipsDialog" class="modal">
            <div class="modal-body">
                <p class="hilight offline-tip-title">离线提醒</p>
                <p class="subscript offline-tip-text" >本书共1200章，预计<span class="data-size">3M</span></p>
            <div class="btn-confirm"><span class="download-icon"></span>立即下载</div><div class="btn-cancel">取消</div>
        </div>
    </div>
    <div class="modal-backdrop"></div>
{% endhighlight %}

### 下拉刷新 (Pull To Refresh)

实例请查看[example/pull-to-refresh.html](example/pull-to-refresh.html)

步骤1：添加下拉组件HTML代码

{% highlight html %}
    <div class="pull-to-refresh">
        <span class="pull-to-refresh-icon icon icon-arrow-up"></span>
        <span class="pull-to-refresh-text">Pull To Refresh</span>
        <span class="pull-to-refresh-done-text">Release To Refresh</span>
        <div class="pull-to-refresh-loading">
            <span class="pull-to-refresh-loading-icon icon icon-refresh"></span>
            <span class="pull-to-refresh-loading-text">Loading...</span>
        </div>
    </div> 
{% endhighlight %}

步骤2：添加class使目标元素可下拉

{% highlight html %}
    <section class="page-content pullable">
        ...
    </section>
{% endhighlight %}

步骤3: 添加下拉刷新触发后要执行的函数

{% highlight javascript %}
    $("#pull-to-refresh").pullToRefresh(function(){
        var me = this;  //下拉刷新完成后要执行的回调函数
        setTimeout(function(){
            me.back();
            }, 500)
    })
{% endhighlight %}

### Smart Bar

Smart Bar 是一个智能显示工具栏的组件。当你往下滚动屏幕时，工具栏会收起隐藏。当你往上快速滚动屏幕时，工具栏会显示。这能给用户全屏的阅读体验，适用于阅读类的网页/App。
示例: [examples/smartbar.html](examples/smartbar.html)

{% highlight html %}
    <nav class='topbar topbar-fixed toolbar smartbar'>
        <h1>Mob Smartbar Example</h1>
    </nav>
{% endhighlight %}

### Carousel

    首页新功能介绍的滚动

### Camera 

调用手机照相机功能
示例：[examples/camera.html](examples/camera.html)


步骤1：添加调用时的html代码

{% highlight html %}
        <button id="camera"><span class="icon icon-camera">/span></button>
{% endhighlight %}

步骤2：调用时的js代码：


{% highlight javascript %}
    $('#camera').camera(function(img){
        handle(img) // img is the pic user uploaded.
    })
{% endhighlight%}

