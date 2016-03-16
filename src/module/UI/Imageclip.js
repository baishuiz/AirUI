Air.Module("AirUI.ui.Imageclip", function(require){
  var imgCamera = require('AirUI.UI.imgCamera');
  var offset    = require('AirUI.UI.offset');
  var dragAble  = require('AirUI.UI.dragAble');

  var defaultOptions = {

  };

  function createImageElement(imgURL, width){
    var imgElement   = document.createElement('img');
    imgElement.src = imgURL;
    imgElement.width = width;
    return imgElement;
  }

  function createCameraCar(width, height, x, y){
    var car = document.createElement('div');
    car.style.position = 'static';
    car.style.width = width + 'px';
    car.style.height = height + 'px';
    car.style.top = y + 'px';
    car.style.left = x + 'px';
    car.style.border = "1px dashed #fff";
    car.style.cursor = 'move'
    car.style.boxSizing = 'border-box';
    car.style.webkitBoxSizing = 'border-box';
    car.style.mozBoxSizing = 'border-box';
    car.style.boxSizing = 'border-box';
    return car;
  }

  function createMask(){
     var mask = document.createElement('div');
     mask.style.opacity = 0.8;
     mask.style.background = 'black';
     mask.style.width = '100%';
     mask.style.height = '100%';
     mask.style.position = 'absolute';
     mask.style.left = 0;
     mask.style.top = 0;
     return mask;
  }

  function ImageClip(imgURL, options){
    var imgContainer = options.imgContainer;
    var scale = options.scale;
    var imgElement   = createImageElement(imgURL, imgContainer.offsetWidth);
    var cameraWidth = options.width * scale;
    var cameraHeight = options.height * scale;
    var cameraWidthWithoutBorder = cameraWidth - 2;
    var cameraHeightWithoutBorder = cameraHeight - 2;
    var cameraCarX = options.x || 0;
    var cameraCarY = options.y || 0;
    var cameraCar = createCameraCar(cameraWidth, cameraHeight, cameraCarX, cameraCarY);


    cameraCar.appendChild(imgElement);
    // clip有1px边框，所以camera需要使用减去2后的值
    var camera = imgCamera(imgElement,cameraWidthWithoutBorder, cameraHeightWithoutBorder );

    camera.translateTo({x:cameraCarX,y:cameraCarY,width:cameraWidthWithoutBorder, height:cameraHeightWithoutBorder});
    dragAble(cameraCar).startDrag({position:'absolute',range:imgContainer , callBack:{
      moving : cameraMovingCallbac
    }})

    imgContainer.appendChild(createMask());
    imgContainer.appendChild(cameraCar);
    function cameraMovingCallbac(e){
      camera.translateTo({x:cameraCar.offsetLeft,y:cameraCar.offsetTop,width:cameraWidthWithoutBorder,height:cameraHeightWithoutBorder});
    }

    this.getOffset = function(){
      var result = {
        x: Math.floor(cameraCar.offsetLeft / scale),
        y: Math.floor(cameraCar.offsetTop / scale)
      };
      return result;
    }
  }

  return ImageClip;
});
