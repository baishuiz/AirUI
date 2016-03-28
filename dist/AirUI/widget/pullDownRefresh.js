Air.Module('AirUI.widget.pullDownRefresh', function(require) {
  var api = function(option) {
    var defaults = {
      container: '',
      next: function() {}
    }
    var start,
      end,
      length,
      isLock = false, //是否锁定整个操作
      isStart = false, //是否移动滑块
      isPulling = false, //移动中
      hasTouch = 'ontouchstart' in window;
    var obj = document.querySelector(option.container);
    var loadingElm = obj.querySelector('.js-spinner');
    var noticeElm = obj.querySelector('.js-top-notice');
    var offset = loadingElm.clientHeight;
    var objparent = document.body;
    var minDragHeight = 50;
    /*操作方法*/
    var fn = {
      //移动容器
      translate: function(diff) {
        obj.style.webkitTransform = 'translate3d(0,' + diff + 'px,0)';
        obj.style.transform = 'translate3d(0,' + diff + 'px,0)';
      },
      //设置效果时间
      setTransition: function(time) {
        obj.style.webkitTransition = 'all ' + time + 's';
        obj.style.transition = 'all ' + time + 's';
      },
      //返回到初始位置
      back: function() {
        fn.translate(0);
        //标识操作完成
        isLock = false;
        isPulling = false;
      },
      addEvent: function(element, event_name, event_fn) {
        if (element.addEventListener) {
          element.addEventListener(event_name, event_fn, false);
        } else if (element.attachEvent) {
          element.attachEvent('on' + event_name, event_fn);
        } else {
          element['on' + event_name] = event_fn;
        }
      }
    };

    fn.translate(0);
    fn.addEvent(obj, 'touchstart', startHandle);
    fn.addEvent(obj, 'touchmove', moveHandle);
    fn.addEvent(obj, 'touchend', endHandle);
    fn.addEvent(obj, 'mousedown', startHandle)
    fn.addEvent(obj, 'mousemove', moveHandle)
    fn.addEvent(obj, 'mouseup', endHandle)

    //滑动开始
    function startHandle(e) {
      if (objparent.scrollTop <= 0 && !isLock) {
        var even = typeof event == "undefined" ? e : event;
        if (!even.touches) {
          isLock = false;
          isStart = false;
          isPulling = false;
          return;
        }
        //标识操作进行中
        isLock = true;
        isStart = true;
        //保存当前鼠标Y坐标
        start = hasTouch ? even.touches[0].pageY : even.pageY;
        //消除滑块动画时间
        fn.setTransition(0);
        loadingElm.style.display = 'none';
        noticeElm.style.display = 'block';
      }
      return false;
    }

    //滑动中
    function moveHandle(e) {
      if (objparent.scrollTop <= 0 && isStart) {
        var even = typeof event == "undefined" ? e : event;
        if (!even.touches) {
          isLock = false;
          isStart = false;
          isPulling = false;
          return;
        }
        isPulling = true;
        //保存当前鼠标Y坐标
        end = hasTouch ? even.touches[0].pageY : even.pageY;
        if (start < end) {
          even.preventDefault();
          //消除滑块动画时间
          fn.setTransition(0);
          //移动滑块
          if ((end - start - offset) / 2 <= 150) {
            length = (end - start - offset) / 2;
            fn.translate(length);
          } else {
            length += 0.3;
            fn.translate(length);
          }
        }
      }
    }
    //滑动结束
    function endHandle(e) {
      if (isPulling) {
        //判断滑动距离是否大于等于指定值
        if (end - start >= offset + minDragHeight) {
          loadingElm.style.display = 'block';
          noticeElm.style.display = 'none';
          //设置滑块回弹时间
          fn.setTransition(1);
          //保留提示部分
          fn.translate(0 + 40);
          //执行回调函数
          if (typeof option.next == "function") {
            option.next.call(fn, e);
          }
        } else {
          //返回初始状态
          fn.back();
        }
      }
    }
  }
  return api;
});
