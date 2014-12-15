---
layout: post
---

#audio

> 提供音频控制组件,具体实例查看 [examples/audio-player.html]:examples/audio-player.html

* 第一个demo

<div class='article-demo'>
    {% highlight html %}
         <div class="audio-player">
            <div class="audio-progress">
                0:00
                <progress class="audio-progress-bar"
                          max="100" value="10"></progress>
                -2:14
            </div>
            <div id="audio-info">
                <h1 class="title">Song Name</h1>

                <p class="descript">Author</p>
            </div>
            <div class='audio-controls'>
                <div>
                    <span class="icon icon-backward"></span>
                </div>
                <div>
                    <span class="icon icon-play"></span>
                </div>
                <div>
                    <span class="icon icon-forward"></span>
                </div>
            </div>
            <div class="audio-volumn">
                <span class="icon icon-volume-down"></span>
                <progress max="100" value="10" class="audio-volume-slidebar"></progress>
                <span class="icon icon-volume-up"></span>
            </div>
        </div>
    {% endhighlight %}
</div>



