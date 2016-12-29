Air.Module("AirUI.UI.dragAble",function(t){function e(t,e){function i(t,e){function i(){for(var t=0;t<e.captive.length;t++){var o=e.captive[t],n=parseInt(o.style.left),a=parseInt(o.style.top);p[t]={top:a,left:n}}}function r(t){t?g={top:t.top||null,right:t.right||null,bottom:t.bottom||null,left:t.left||null}:e.ableDisable=!0}function c(r){function c(l){if(l=a(l,this),l.preventDefault(),e.ableDisable)return void u();l=l||window.event;l.target||l.srcElement;l.pageX=l.pageX||l.clientX;var f=o(l);if(e.range)var i={top:e.range.clientTop,right:e.range.offsetWidth-e.range.clientWidth-e.range.clientLeft,bottom:e.range.offsetHeight-e.range.clientHeight-e.range.clientTop,left:e.range.clientLeft};dy=f.globalY-b.globalY,dx=f.globalX-b.globalX,l.pageX||(l.pageX=l.clientX),l.pageY||(l.pageY=l.clientY);var r=h.left+dx,c=h.top+dy,v=n(t);if(e.range){var d=n(e.range),y=t.offsetLeft==v.left?r:v.left+r,x=t.offsetLeft==v.left?d.left+e.range.offsetWidth-i.right:e.range.clientWidth;e.range&&r+t.offsetWidth>x?r=t.offsetLeft==v.left?d.left+e.range.offsetWidth-t.offsetWidth-i.right:e.range.clientWidth-t.offsetWidth:e.range&&y<d.left+i.left&&(r=t.offsetLeft==v.left?d.left+i.left:0);var k=t.offsetTop==v.top?c:v.top+c,w=t.offsetTop==v.top?d.top+e.range.offsetHeight-i.bottom:e.range.clientHeight;e.range&&c+t.offsetHeight>w?c=t.offsetTop==v.top?d.top+e.range.offsetHeight-t.offsetHeight-i.bottom:e.range.clientHeight-t.offsetHeight:e.range&&k<d.top+i.top&&(c=t.offsetTop==v.top?d.top+i.top:0)}var B={top:h.top+dy,right:h.left+t.offsetWidth+dx,bottom:h.top+t.offsetHeight+dy,left:h.left+dx};g.top&&B.top<=g.top?c=g.top:g.bottom&&B.bottom>=g.bottom&&(c=g.bottom-t.offsetHeight),g.left&&B.left<=g.left?r=g.left:g.right&&B.right>=g.right&&(r=g.right-t.offsetWidth),s(t,r,c);for(var M=0;M<e.captive.length;M++){var X=e.captive[M];s(X,p[M].left+dx,p[M].top+dy)}var D=Math.atan2(dy,dx,D),H=Math.sqrt(dy*dy+dx*dx);return H=Math.sqrt((l.pageX-m.x)*(l.pageX-m.x)+(l.pageY-m.y)*(l.pageY-m.y)),m={x:l.pageX,y:l.pageY},e.callBack.moving({tx:dx,ty:dy,angle:D,speed:H}),window.getSelection?window.getSelection().removeAllRanges():document.selection&&document.selection.empty(),!1}function u(){return r=a(r,this),r.stopBubble(),f(t,"mousemove"),f(t,"mouseup"),beacon(document).off("mousemove",c),beacon(document).off("mouseup",u),i(),e.callBack.stopMove(),!1}if(r=a(r,this),r.preventDefault(),r.stopBubble(),beacon(window).on("blur",u),e.ableDisable)return void u();var v=r.layerX||r.offsetX,d=r.layerY||r.offsetY,b=o(r);i();var h={left:t.offsetLeft,top:t.offsetTop},m={x:v,y:d};return e.callBack.startMove(),l(t,"mousemove"),beacon(document).on("mousemove",c),l(t,"mouseup"),beacon(document).on("mouseup",u),!1}e=e||{},e.position&&(t.style.position=e.position),e.callBack=e.callBack||{},e.callBack.moving=e.callBack.moving||function(){},e.callBack.stopMove=e.callBack.stopMove||function(){},e.callBack.startMove=e.callBack.startMove||function(){},e.lock=e.lock||{},e.captive=e.captive&&[].concat(e.captive)||[],e.ableDisable=e.ableDisable||!1,e.allowMove="boolean"==typeof e.allowMove?e.allowMove:!0,this.ableDisable=!1;var p=[],s=function(t){if(!e.allowMove)return function(){};var o;return o=t.v&&t.h?function(){}:t.v?function(t,e,o){t.style.left=e+"px"}:t.h?function(t,e,o){t.style.top=o+"px"}:function(t,e,o){t.style.left=e+"px",t.style.top=o+"px"}}(e.lock),g={};return beacon(t).on("mousedown",c,{preventDefault:!0,stopBubble:!0}),{stop:r}}return new i(t,e)}var o=t("AirUI.UI.mousePosition"),n=t("AirUI.UI.offset"),a=t("AirUI.event.eventObject"),l=t("AirUI.event.setCapture"),f=t("AirUI.event.releaseCapture");return function(t){var o,n={startDrag:function(n){o=e(t,n),beacon(o).on("stop",function(t,e){o.stop(e)})},stopDrag:function(t){beacon(o).on("stop",t)}};return n}});