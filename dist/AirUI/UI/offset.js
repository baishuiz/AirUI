Air.Module("AirUI.UI.offset",function(require){function t(t){for(var f={top:t.offsetTop,right:t.offsetParent.clientWidth-t.offsetLeft-t.offsetWidth,bottom:t.offsetParent.clientHeight-t.offsetTop-t.offsetHeight,left:t.offsetLeft};t=t.offsetParent;){var o={top:t.clientTop,right:t.offsetWidth-t.clientLeft-t.clientWidth,bottom:t.offsetHeight-t.clientTop-t.clientHeight,left:t.clientLeft},n=t.offsetParent||t.parentElement||t.parentNode;f={top:f.top+t.offsetTop+o.top,right:f.right+n.clientWidth-t.offsetLeft-t.offsetWidth+o.right,bottom:f.bottom+n.clientHeight-t.offsetTop-t.offsetHeight+o.bottom,left:f.left+t.offsetLeft+o.left}}return f}return t});