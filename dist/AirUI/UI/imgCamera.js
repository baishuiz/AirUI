Air.Module("AirUI.UI.imgCamera", function(require){
  function ImagePlus(imgDom, cameraWidth, cameraHeight){
    if (!imgDom) {
        throw Error("nedd img Element");
        //return false;
    }

    var wrap;
    var oldDuration = document.defaultView.getComputedStyle(imgDom,null)["transition"];
    imgDom.style.transition = "none";
    var imgModel = {
        width : cameraWidth,
        height : cameraHeight,
        top : imgDom.clientTop,
        left : imgDom.clientLeft,
        scaleX : 1,
        scaleY : 1,
        url : imgDom.getAttribute('src')
    };
    imgDom.style.transition = oldDuration;

    var STRETCH_TYPE = {
        CUT     : 2,
        AUTO    : 4,
        SCALING : 8
    };


    function wrapImg(imgElement){
      var scene = document.createElement('div');
      imgElement.parentNode.insertBefore(scene, imgElement);
      scene.appendChild(imgElement);
      scene.style.width = imgModel.width + "px";
      scene.style.height = imgModel.height + "px";
      scene.className = 'cut-img-wrap';
      return scene;
    }


    this.stretch = STRETCH_TYPE.AUTO; //默认变比填充图像
    this.picture = imgDom;
    this.scene = wrapImg(imgDom);


    this.setURL = function(url){
      _url =  url;
      this.picture.src = _url;
    };


    this.setSize = function(scaleX,scaleY){
      imgModel.scaleX = scaleX || imgModel.scaleX;
      imgModel.scaleY = scaleY || imgModel.scaleY;
      imgDom.style.width = imgModel.width * scaleX + "px";
      imgDom.style.height = imgModel.height * scaleY + "px";
    };

    var clipInfo = {
      top : 0,
      right : 0,
      bottom : 0,
      left : 0
    };

    this.translateTo = function(cameraModel){
      var img = this.picture;
      var wrap = this.scene;
      clipInfo.top = clipInfo.top + cameraModel.y * imgModel.scaleY
      clipInfo.right = clipInfo.right + cameraModel.x * imgModel.scaleX + cameraModel.width
      clipInfo.bottom = clipInfo.bottom +cameraModel.y * imgModel.scaleY + cameraModel.height
      clipInfo.left = clipInfo.left + cameraModel.x * imgModel.scaleX

      var clipStr = 'rect(' + [
                                  cameraModel.y * imgModel.scaleY + 'px',
                                  cameraModel.x * imgModel.scaleX + cameraModel.width+'px',
                                  cameraModel.y * imgModel.scaleY + cameraModel.height + 'px',
                                  cameraModel.x * imgModel.scaleX + 'px'
                              ].join(',')+')';


      img.style.clip = clipStr;
      img.style.position = 'absolute';
      img.style.left = imgModel.left  - cameraModel.x * imgModel.scaleX +'px';
      img.style.top  = imgModel.top  - cameraModel.y * imgModel.scaleY + 'px';
      wrap.style.width = cameraModel.width + 'px';
      wrap.style.height = cameraModel.height + 'px';
    };


  }

  var getCamera = function(img, cameraWidth, cameraHeight){
    var camera = new ImagePlus(img, cameraWidth, cameraHeight);
    return camera;
  };
  return getCamera;
});