Air.Module("AirUI.UI.offset",function(t){function e(t){for(var e={top:t.offsetTop,right:t.offsetParent.clientWidth-t.offsetLeft-t.offsetWidth,bottom:t.offsetParent.clientHeight-t.offsetTop-t.offsetHeight,left:t.offsetLeft};t=t.offsetParent;){var f={top:t.clientTop,right:t.offsetWidth-t.clientLeft-t.clientWidth,bottom:t.offsetHeight-t.clientTop-t.clientHeight,left:t.clientLeft},o=t.offsetParent||t.parentElement||t.parentNode;e={top:e.top+t.offsetTop+f.top,right:e.right+o.clientWidth-t.offsetLeft-t.offsetWidth+f.right,bottom:e.bottom+o.clientHeight-t.offsetTop-t.offsetHeight+f.bottom,left:e.left+t.offsetLeft+f.left}}return e}return e});