(function($){
    window.onload = function(){
        var doc = window.parent.document;
        var $list = $('.doc-content .article-demo',doc);
        if(!$list.length)    return;
        for(var i= 0,item;item = $list[i++];){
            $('body').append(item.innerText);
        }
        $('#J_demo',doc).show();
    };
})(Zepto);