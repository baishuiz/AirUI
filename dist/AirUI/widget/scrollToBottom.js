Air.Module('AirUI.widget.scrollToBottom', function(require) {
  var getPageScrollPos = function() {
    var docElm = document.documentElement;
    var docBody = document.body;
    var left = Math.max(docElm.scrollLeft, docBody.scrollLeft),
      top = Math.max(docElm.scrollTop, docBody.scrollTop),
      height = Math.min(docElm.clientHeight, docBody.clientHeight),
      width = Math.min(docElm.clientWidth, docBody.clientWidth),
      pageWidth = Math.max(docElm.scrollWidth, docBody.scrollWidth),
      pageHeight = Math.max(docElm.scrollHeight, docBody.scrollHeight);

    return {
      top: top,
      left: left,
      height: height,
      width: width,
      pageWidth: pageWidth,
      pageHeight: pageHeight
    };
  };

  /*
  * 绑定滚动事件
  * @param function extDetectFn 额外的判断条件方法
  * @param function callback 回调
  */
  function bind(extDetectFn, callback) {
    if (!extDetectFn) {
      return;
    }
    beacon(window).on('scroll', function() {
      var pos = getPageScrollPos();

      if (pos.top === 0) {
        return;
      }

      var height = pos.pageHeight - (pos.top + pos.height);
      if (height <= 5 && extDetectFn()) {
        window.scrollTo(0, pos.pageHeight);
        callback && callback();
      }
    });
  }

  return {
    bind: bind
  }
});
