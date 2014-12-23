(function ($) {
    var Slide = function (element, options) {
        this.$element  = $(element)
        this.options   = $.extend({}, Slide.DEFAULTS, options)
    }

    Slide.DEFAULTS = {
        html:'<ul><li>1</li><li>2</li><li>3</li><li>4</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>9</li></ul>'
    }


    Slide.prototype.init = function(){
        var t = this;
        var $e = t.$element;

        $e.css('width',document.body.offsetWidth);
        //$e.html(t.options.html);
        t.options.html=$e.html();

        t.num = $e.find('li').length;
        t.wt = parseInt($e.find('li').first().css('width')) + parseInt($e.find('li').first().css('margin-left'))*2
            +parseInt($e.find('li').first().css('border-left'))*2;

        $e.find('ul').css('width',t.num*t.wt+'px');
    }

    Slide.prototype.show = function () {
        var t = this;
        var $e = t.$element;

        window.addEventListener('orientationchange', function () {
            setTimeout(function(){
                $e.css('width',document.body.offsetWidth);
            },300)
        }, false);

        //if($e.children().length == 0){
        t.init();

        var prevOffset = 0;
        var isOutLeft=false;
        var isOutRight=false;
        var OUTSPEED=0.2;
        Hammer($e.find('ul')[0],{prevent_Default:true}).on('dragstart dragleft dragright dragend swipeleft swiperight',function(e){
            e.gesture.preventDefault();
            var min =  -t.num*t.wt+document.body.offsetWidth;
            switch(e.type){
                case 'dragstart':
                    prevOffset = parseInt($(this).css('left'));
                    $(this).removeClass('animate');
                    break;
                case 'dragleft':
                case 'dragright':
                    var offset = e.gesture.deltaX;
                    var left = offset +prevOffset;
                    if(left > 0 ){
                        left=offset*OUTSPEED+prevOffset;
                        isOutLeft=true;
                        $(this).css({
                            'left':left+'px'
                        })
                        return;	
                    }else if(left<min){
                        left=offset*OUTSPEED+prevOffset;
                        isOutRight=true;
                        $(this).css({
                            'left':left+'px'
                        })
                        return;
                    }	

                    $(this).css('left', left);
                    break;
                case 'dragend':
                    if(isOutLeft){
                        $(this).addClass('animate')
                            $(this).css('left',0);
                        isOutLeft = false;
                    }
                    if(isOutRight){
                        $(this).addClass('animate')
                            $(this).css('left',min);
                        isOutRight = false;
                    }
                    break;
                case 'swipeleft':
                    $(this).addClass('animate')
                        $(this).css('left',min);	
                    break;
                case 'swiperight':
                    $(this).addClass('animate')
                        $(this).css('left',0);	
                    break;
            }
        });

        //}


        $e.show();

    }

    // Slide PLUGIN DEFINITION
    // ========================

    var old = $.fn.slide

        $.fn.slide = function (option) {
            return this.each(function () {
                var $this   = $(this)
                var data    = $this.data('mob.slide')
                var options = typeof option == 'object' && option

                if (!data) $this.data('mob.slide', (data = new Slide(this, options)))
                if(typeof option=='string') data[option]()
            })
        }

    $.fn.slide.Constructor = Slide


        // ROLL NO CONFLICT
        // ==================

        $.fn.slide.noConflict = function () {
            $.fn.slide = old
                return this
        }

})($)
