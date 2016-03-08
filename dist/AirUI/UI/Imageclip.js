Air.Module("AirUI.ui.Imageclip", function(require){
  var imgCamera = require('AirUI.UI.imgCamera');
  var offset    = require('AirUI.UI.offset');
  var dragAble  = require('AirUI.UI.dragAble');

  var defaultOptions = {

  };

  function createImageElement(imgURL){
    var imgElement   = document.createElement('img');
    imgElement.src = imgURL;
    return imgElement;
  }

  function createCameraCar(width,height){
    var car = document.createElement('div');
    car.style.position = 'static';
    car.style.width = width + 'px';
    car.style.height = height + 'px';
    car.style.top = 0;
    car.style.left = 0;
    car.style.border = "1px dashed #fff";
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
    // options = merge(optons, defaultOptions);
    var imgContainer = options.imgContainer;
    var imgElement   = createImageElement(imgURL);
    var cameraWidth = options.width;
    var cameraHeight = options.height;
    var cameraCar = createCameraCar(cameraWidth, cameraHeight);


    cameraCar.appendChild(imgElement);
    var camera = imgCamera(imgElement,cameraWidth, cameraHeight );

    camera.translateTo({x:0,y:0,width:cameraWidth, height:cameraHeight});
    dragAble(cameraCar).startDrag({position:'absolute',range:imgContainer , callBack:{
      moving : cameraMovingCallbac
    }})

    imgContainer.appendChild(createMask());
    imgContainer.appendChild(cameraCar);
    function cameraMovingCallbac(e){
      camera.translateTo({x:cameraCar.offsetLeft,y:cameraCar.offsetTop,width:cameraWidth,height:cameraHeight});
    }

    this.getOffset = function(){
      var result = {}
      return result;
    }
  }

  return ImageClip;
});
