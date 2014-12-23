function autoscale(img, max, oWidth, oHeight) {
    var width = 0, height = 0, percent, ow = img.width || oWidth, oh = img.height || oHeight;
    if (ow > max || oh > max) {
        if (ow >= oh) {
            if (width = ow - max) {
                percent = (width / ow).toFixed(2);
                img.height = oh - oh * percent;
                img.width = max;
            }
        } else {
            if (height = oh - max) {
                percent = (height / oh).toFixed(2);
                img.width = ow - ow * percent;
                img.height = max;
            }
        }
    }
}

function drawToCanvas(img) {
  var oldwt=img.width;
  var oldht=img.height;

  var max = document.body.offsetWidth;
  autoscale(img,max,max);
  var width = img.width;
  var height = img.height;
  //var max = Math.max(width, height)
  //var scale = Math.min(max, 420) / max;
   
  //width *= scale;
  //height *= scale;
   
  $("#viewer-container").width(width).height(height);
  $("#viewer").width(width).height(height);
   
  var anno = $("#annotations").get(0);
  anno.width = width;
  anno.height = height;
   
  var canvas = $("#preview").get(0);
  canvas.width = width;
  canvas.height = height;
  // draw image to preview canvas
  var context = canvas.getContext("2d");

  if(snap.os=='ios'){
     // if(!snap.hasrotate){
       // snap.hasrotate=true
       // Rotate.rotateImg('preview','right');
      //}else{
          drawImageIosFix(context, img,0,0,img.width,img.height);
      //}
    }else{
    context.drawImage(img, 0, 0, img.width, img.height);
  }
    Rotate.show();
}  

function detectVerticalSquash(img) {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = ih;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, 1, ih).data;
    // search image edge pixel position in case it is squashed vertically.
    var sy = 0;
    var ey = ih;
    var py = ih;
    while (py > sy) {
        var alpha = data[(py - 1) * 4 + 3];
        if (alpha === 0) {
            ey = py;
        } else {
            sy = py;
        }
        py = (ey + sy) >> 1;
    }
    var ratio = (py / ih);
    return (ratio===0)?1:ratio;
}

function drawImageIosFix(ctx, img, dx, dy, dw, dh) {
    var vertSquashRatio = detectVerticalSquash(img);
    ctx.drawImage(img, dx, dy, dw, dh / vertSquashRatio);
}
var detector = {
  abortCurrent: function() {
    if (this.worker) {
      this.worker.terminate();
    }
  },

  detectCats: function(canvas) {
    $("#progress").text("正在进行猫脸识别,大约要花费几十秒...");

    var canvas = $("#preview").get(0);

    if (window.Worker) {
      var worker = new Worker("camera/detection-worker.js");
      worker.onmessage = this.onMessage;
      worker.onerror = this.onError;

      kittydar.setOptions({
        scaleStep: 6
      })
      var resizes = kittydar.getAllSizes(canvas);
      worker.postMessage(resizes);

      this.worker = worker;
    }
    else {
      var rects = kittydar.detectCats(canvas, network);
      this.paintCats(rects);
    }
  },

  paintCats : function(rects) {
    var noun = rects.length == 1 ? "猫" : "猫猫";
    $("#progress").text("检测出" + rects.length + "个" + noun);

    this.clearRects();
    this.paintRects(rects, "red");
  },

  clearRects: function() {
    var canvas = $("#annotations").get(0);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },

  paintRects : function(rects, color) {
    var canvas = $("#annotations").get(0);
    var ctx = canvas.getContext("2d");

    ctx.lineWidth = 2;
    ctx.strokeStyle = color || "red";

    for (var i = 0; i < rects.length; i++) {
      var rect = rects[i];
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    }
  },

  onMessage : function(event) {
    var data = event.data;
    if (data.type == 'progress') {
      detector.showProgress(data);
    }
    else if (data.type == 'result') {
      detector.paintCats(data.cats);
    }
  },

  onError : function(event) {
    console.log("Error from detection Worker:", event.message)
  },

  showProgress : function(progress) {
    console.log(progress);
    this.paintRects(progress.rects, "orange");
    $("#progress").text("已检测 " + progress.size + "px...");
  }
}
