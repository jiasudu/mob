---
layout: post
---

#tab

* 第一个demo

<div class='article-demo'>
    {% highlight html %}
     <ul class="nav nav-tabs">
       <li><a href="#home" data-toggle="tab">Home</a></li>
       <li><a href="#profile" data-toggle="tab">Profile</a></li>
     </ul>
     
     <div class="tab-content">
       <div class="tab-pane active" id="home">Home</div>
       <div class="tab-pane" id="profile">Profile</div>
     </div>
    {% endhighlight %}
</div>

* 第二个demo

<div class='article-demo'>
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
</div>

> 接口

```bash
$().tab
```
> 事件

```bash
- .show
- .shown
```

> 示例

```bash
$('a[data-toggle="tab"]').on('shown', function (e) {
            e.target // activated tab
            e.relatedTarget // previous tab
    })
```






