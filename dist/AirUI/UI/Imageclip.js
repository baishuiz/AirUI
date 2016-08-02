Air.Module("AirUI.UI.Imageclip", function(require) {
  var imgCamera = require('AirUI.UI.imgCamera');
  var offset = require('AirUI.UI.offset');
  var dragAble = require('AirUI.UI.dragAble');

  var defaultOptions = {

  };

  function createImageElement(imgURL, width) {
    var imgElement = document.createElement('img');
    imgElement.src = imgURL;
    imgElement.width = width;
    return imgElement;
  }

  function createCameraCar(width, height, x, y) {
    var car = document.createElement('div');
    car.style.position = 'static';
    car.style.top = y + 'px';
    car.style.left = x + 'px';
    car.className = 'cut-box';
    car.innerHTML = '<span class="cut-line cut-line-t"></span><span class="cut-point cut-point-t"></span>' +
                    '<span class="cut-line cut-line-r"></span><span class="cut-point cut-point-r"></span>' +
                    '<span class="cut-line cut-line-b"></span><span class="cut-point cut-point-b"></span>' +
                    '<span class="cut-line cut-line-l"></span><span class="cut-point cut-point-l"></span>' +
                    '<span class="cut-point cut-point-tr"></span><span class="cut-point cut-point-br"></span>' +
                    '<span class="cut-point cut-point-bl"></span><span class="cut-point cut-point-tl"></span>';
    return car;
  }

  function createMask() {
    var mask = document.createElement('div');
    mask.className = 'cut-mask';
    return mask;
  }

  /**
  * 绑定拖拽线
  * @param {dom}      root     - 根节点
  * @param {dom}      rangeElm - 拖动范围节点
  * @param {object}   options  - 参数，包含允许截图的最大、最小尺寸
  * @param {function} callback - 拖拽中的回调
  */
  function dragLine(rootElm, rangeElm, options, callback) {
    var baseWidth, baseHeight, baseTop, baseLeft;

    var calBaseSize = function() {
      baseWidth = rootElm.offsetWidth;
      baseHeight = rootElm.offsetHeight;
      baseTop = rootElm.offsetTop;
      baseLeft = rootElm.offsetLeft;
    };

    var getBaseSize = function() {
      return {
        width: baseWidth - 2,
        height: baseHeight - 2,
        top: baseTop,
        left: baseLeft
      }
    }
    options.rangeHeight = rangeElm.offsetHeight;
    options.rangeWidth = rangeElm.offsetWidth;

    var bindDrag = function(selector, type) {
      dragAble(rootElm.querySelector(selector)).startDrag({
        position: 'absolute',
        range: rangeElm,
        allowMove: false,
        callBack: {
          startMove: calBaseSize,
          moving: function(e) {
            calCameraSize(e, getBaseSize(), type, options, callback);
          }
        }
      });
    }

    bindDrag('.cut-line-t', 'top');
    bindDrag('.cut-line-b', 'bottom');
    bindDrag('.cut-line-r', 'right');
    bindDrag('.cut-line-l', 'left');
    bindDrag('.cut-point-tr', 'topRight');
    bindDrag('.cut-point-br', 'bottomRight');
    bindDrag('.cut-point-bl', 'bottomLeft');
    bindDrag('.cut-point-tl', 'topLeft');
  }

  /**
  * 计算拖拽的尺寸
  * @param  {object}   e        - dragAble组件返回的对象
  * @param  {object}   baseSize - 根元素的基础尺寸数据
  * @param  {object}   options  - 参数，包含允许截图的最大、最小尺寸
  * @param  {function} callback - 拖拽中的回调
  * @return {object}   calObj   - 给callback中传入计算好的尺寸对象
  */
  function calCameraSize(e, baseSize, type, options, callback) {
    var calWidth, calHeight, calTop, calLeft, movedTop, movedLeft;
    var isCorner = ['topRight', 'bottomRight', 'bottomLeft', 'topLeft'].indexOf(type) !== -1; // 四角
    var isLeft = ['left', 'bottomLeft', 'topLeft'].indexOf(type) !== -1; // 左
    var isTop = ['top', 'topRight', 'topLeft'].indexOf(type) !== -1; // 上
    var isBottom = ['bottom', 'bottomLeft', 'bottomRight'].indexOf(type) !== -1; // 下
    var isRight = ['right', 'topRight', 'bottomRight'].indexOf(type) !== -1; // 右
    var isHorizontal = ['left', 'right'].indexOf(type) !== -1; // 水平
    var isVertical = ['top', 'bottom'].indexOf(type) !== -1; // 垂直

    if (isHorizontal || isCorner) {
      var tx = isLeft ? e.tx : -e.tx;
      calWidth =  baseSize.width - tx;
      calHeight = calWidth * options.maxHeight / options.maxWidth;

      movedTop = (baseSize.height - calHeight) / 2;
      movedLeft = isLeft ? tx : 0;
    }

    if (isVertical || isCorner) {
      var ty = isTop ? e.ty : -e.ty;
      calHeight = baseSize.height - ty;
      calWidth = calHeight * options.maxWidth / options.maxHeight;

      movedTop = isTop ? ty : 0;
      movedLeft = (baseSize.width - calWidth) / 2;
    }

    var calMovedTop = (baseSize.height - calHeight) / 2;
    var calMovedLeft = (baseSize.width - calWidth) / 2;

    // if (isHorizontal) {
    //   movedTop = calMovedTop;
    //   if (isLeft) {
    //     movedLeft = calMovedTop;
    //   } else {
    //     movedLeft = isCorner ? calMovedLeft : 0;
    //   }
    // } else {
    //   movedLeft = calMovedLeft;
    //   if (isTop) {
    //     movedTop = ty;
    //   } else {
    //     movedTop = isCorner ? calMovedTop : 0;
    //   }
    // }

    calTop = baseSize.top + movedTop;
    calLeft = baseSize.left + movedLeft;
    calTop = calTop < 0 ? 0 : calTop;
    calLeft = calLeft < 0 ? 0 : calLeft;

    if (calWidth > options.maxWidth || calWidth < options.minWidth) {
      return;
    }

    if (calHeight > options.maxHeight || calHeight < options.minHeight) {
      return;
    }

    if (calTop + calHeight > options.rangeHeight) {
      return
    }

    if (calLeft + calWidth > options.rangeWidth) {
      return
    }

    callback({
      top: calTop,
      left: calLeft,
      width: calWidth,
      height: calHeight
    });
  }

  function ImageClip(imgURL, options) {
    var imgContainer = options.imgContainer;
    var scale = options.scale;
    var imgElement = createImageElement(imgURL, imgContainer.offsetWidth);
    var cameraWidth = options.width * scale;
    var cameraHeight = options.height * scale;
    var cameraWidthWithoutBorder = cameraWidth - 2;
    var cameraHeightWithoutBorder = cameraHeight - 2;
    var cameraCarX = options.x || 0;
    var cameraCarY = options.y || 0;
    var cameraCar = createCameraCar(cameraWidth, cameraHeight, cameraCarX, cameraCarY);


    cameraCar.appendChild(imgElement);
    // clip有1px边框，所以camera需要使用减去2后的值
    var camera = imgCamera(imgElement, cameraWidthWithoutBorder, cameraHeightWithoutBorder);

    camera.translateTo({ x: cameraCarX, y: cameraCarY, width: cameraWidthWithoutBorder, height: cameraHeightWithoutBorder });

    function dragCameraCar() {
      dragAble(cameraCar).startDrag({
        position: 'absolute',
        range: imgContainer,
        callBack: {
          startMove: function(e) {
            cameraWidthWithoutBorder = cameraCar.offsetWidth - 2;
            cameraHeightWithoutBorder = cameraCar.offsetHeight - 2;
          },
          moving: function(e) {
            camera.translateTo({ x: cameraCar.offsetLeft, y: cameraCar.offsetTop, width: cameraWidthWithoutBorder, height: cameraHeightWithoutBorder });
          }
        }
      });
    }
    dragCameraCar();

    dragLine(cameraCar, imgContainer, {
      minWidth: options.minWidth * scale,
      minHeight: options.minHeight * scale,
      maxWidth: cameraWidth,
      maxHeight: cameraHeight
    }, function (calObj) {
      cameraCar.style.top = calObj.top + 'px';
      cameraCar.style.left = calObj.left + 'px';
      cameraCar.style.width = calObj.width + 'px';
      cameraCar.style.height = calObj.height + 'px';

      camera.translateTo({ x: cameraCar.offsetLeft, y: cameraCar.offsetTop, width: calObj.width, height: calObj.height });
    });

    imgContainer.appendChild(createMask());
    imgContainer.appendChild(cameraCar);

    this.getOffset = function() {
      var result = {
        x: Math.floor(cameraCar.offsetLeft / scale),
        y: Math.floor(cameraCar.offsetTop / scale),
        width: Math.floor(cameraCar.clientWidth / scale),
        height: Math.floor(cameraCar.clientHeight / scale)
      };
      return result;
    }
  }

  return ImageClip;
});
