//take a photo in the mobile phone and return the photo's image data.
//support ios safari 6+, android.

//////////////////////////////////////////// view model
function Snap(conf){
    var me = this;
    this.conf = conf || {};
    this.os = null;
    this.camera = new Camera();
    this.checkEnv();
    this.maskEl="#mask";
    this.action = 'self.cat';
    this.handlers = {
        'self.cat': function(){
            if(typeof detector != undefined){
                detector.abortCurrent();
            }
            if(this.os == 'ios'){
                $("#progress").text('猫脸识别暂不支持ios,请尝试其它功能');
            }else{
                detector.detectCats();
            }
        },
        'self.more': function(){
            if(typeof detector != undefined){
                detector.abortCurrent();
            }
            showMoreResult();
        }
    }
}

Snap.prototype = {
    'snap': function(event){
        $(this.conf.snap_image).trigger('click');
    },
    'localSnap': function(event){
        $(this.conf.local_snap_image).trigger('click');
    },
    'detect': function(img, first){
        var me = this;
        this.step.snap.end();
        this.maskShow();
        this.step.detect.start();
        if(first){
            drawToCanvas(img);
        }
        me.handlers[me.action]();
        setTimeout(function(){
            me.maskHide();
            if(me.resultCallback){
                me.resultCallback();
            }
        }, 1000);
    },
    'checkEnv': function(){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            this.os = "ios";
        }   
    },
    'bindEvents': function(){
        var me = this,
        handling = false;
        $(this.conf.snap_btn).on('click', function(event){
            me.snap.call(me, event)
        });
        
        $(this.conf.local_snap_btn).on('click', function(event){
            me.localSnap.call(me, event)
        });
        
        $(this.conf.snap_image).camera(function(img){
            me.detect.call(me, img, true);
        });
      
        $(this.conf.local_snap_image).camera(function(img){
            me.detect.call(me, img, true);
        });
    },
    'bindClickTo': function(ele){
        this.conf.snap_btn = ele;
        return this;
    },
    'bindLocalSnapTo': function(ele){
        this.conf.local_snap_btn = ele;
        return this;
    },
    'setCameraInput': function(ele){
        this.conf.snap_image = ele;
        return this;
    },
    'setLocalInput': function(ele){
        this.conf.local_snap_image = ele;
        return this;
    },
    'setTabs': function(el){
        var me = this;
        $(el).on('click', function(event){
            me.action = $(this).data("action");
            me.detect(event);
        });
        return this;
    },
    'start': function(){
        this.bindEvents();
        return this;
    },
    'step': {
        'snap': {
            'start': function(){
                return this.step;
            },
            'end': function(){
                $("#camera").addClass("hide");
                return this.step;
            }
        },
        'detect': {
            'start': function(){
                $("#detect").removeClass("hide");
                return this.step;
            },
            'end': function(){
                return this.step;
            }
        }
    },
    'maskShow': function(){
        $(this.maskEl).show();
        return this;
    },
    'maskHide': function(){
        $(this.maskEl).hide();
        return this;
    },
    'onReady': function(callback){
        this.resultCallback = callback;
        return this;
    }
}

var createSnap = function(){
    return new Snap();
}

///////////////////////////////////////////////////// detector model

var showMoreResult = function(){
        $("#progress").html('更多功能即将上线<br>敬请期待!');
}
