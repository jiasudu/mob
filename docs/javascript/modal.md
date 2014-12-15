---
layout: post
---

#modal

* 第一个demo

<div class='article-demo'>
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
</div>

* 第二个demo

<div class='article-demo'>
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
</div>






