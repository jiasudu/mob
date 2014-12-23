var Rotate={
    init:function(){
        var t=this;
        t.$e=$('.toolbar .rotate');
        t.$e.click(function(){
            t.rotateImg('preview','right')
        });
    },
    show:function(){
        var t=this;
        t.$e.show();
    },
    hide:function(){
        var t=this;
        t.$e.hide();
    },
    rotateImg:function(id,direction){
        //最小与最大旋转方向，图片旋转4次后回到原方向  
        var min_step = 0;  
        var max_step = 3;  
        snap.camera.getImage(function(img){
            if (img == null)return;  
            //img的高度和宽度不能在img元素隐藏后获取，否则会出错 

            var max = document.body.offsetWidth;
            var oldwt=img.width;
            var oldht=img.height;
            autoscale(img,max,max)
            var height = img.height;  
            var width = img.width;  
            var canvas = document.getElementById(id);  
            if(canvas==null)    return;
            var step = canvas.getAttribute('step'); 

            if (step == null) {  
                step = min_step;  
            }  
            if (direction == 'right') {  
                step++;  
                //旋转到原位置，即超过最大值  
                step > max_step && (step = min_step);  
            } else {  
                step--;  
                step < min_step && (step = max_step);  
            }  
            canvas.setAttribute('step', step);  
            //旋转角度以弧度值为参数  
            var degree = step * 90 * Math.PI / 180;  
            var ctx = canvas.getContext('2d');  
            switch (step) {  
                case 0:  
                    canvas.width = width;  
                    canvas.height = height;
                    var left=$(canvas).attr('_left');
                    $(canvas).css('left',left+'px');
                   drawImageIosFix(ctx,img,0,0,width,height)
                   //ctx.drawImage(img,0,0,width,height);  
                    break;  
                case 1:  
                    canvas.width = height;  
                    canvas.height = width; 
                    $('#viewer').width(height).height(width);     
                    var left=$(canvas).position().left;
                    $(canvas).css('left',0).attr('_left',left);
                    ctx.rotate(degree); 
                   drawImageIosFix(ctx,img,0,-height,width,height)
                   //ctx.drawImage(img,0,-height,width,height);  
                    break;  
                case 2:  
                    canvas.width = width;  
                    canvas.height = height;  
                    var left=$(canvas).attr('_left');
                    $(canvas).css('left',left+'px');
                    ctx.rotate(degree);  
                   drawImageIosFix(ctx,img,-width,-height,width,height)
                   //ctx.drawImage(img,-width,-height,width,height);  
                    break;  
                case 3:  
                    canvas.width = height;  
                    canvas.height = width;  
                    $(canvas).css('left',0).attr('_left',left);
                    ctx.rotate(degree);  
                   drawImageIosFix(ctx,img,-width,0,width,height)
                   //ctx.drawImage(img,-width,0,width,height);  
                    break;  
            }  


        });  
    }
}
