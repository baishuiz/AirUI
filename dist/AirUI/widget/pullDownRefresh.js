Air.Module("AirUI.widget.pullDownRefresh",function(t){var e=function(t){function e(t){if(E.scrollTop<=0&&!u){var e="undefined"==typeof event?t:event;if(!e.touches)return u=!1,c=!1,void(d=!1);c=!0,i=f?e.touches[0].pageY:e.pageY,m.setTransition(0),p.style.display="none",y.style.display="block"}return!1}function n(t){if(E.scrollTop<=0&&c&&!u){var e="undefined"==typeof event?t:event;if(!e.touches)return u=!1,c=!1,void(d=!1);d=!0,r=f?e.touches[0].pageY:e.pageY,r>i&&(e.preventDefault(),m.setTransition(0),150>=(r-i-h)/2?(l=(r-i-h)/2,m.translate(l)):(l+=.3,m.translate(l)))}}function o(e){d&&!u&&(u=!0,r-i>=h+b?(p.style.display="block",y.style.display="none",m.setTransition(1),m.translate(40),"function"==typeof t.next&&t.next.call(m,e)):m.back())}function a(){u=!0}function s(){m.back()}var i,r,l,u=!1,c=!1,d=!1,f="ontouchstart"in window,v=document.querySelector(t.container),p=v.querySelector(".js-spinner"),y=v.querySelector(".js-top-notice"),h=p.clientHeight,E=document.body,b=50,m={translate:function(t){v.style.webkitTransform="translate3d(0,"+t+"px,0)",v.style.transform="translate3d(0,"+t+"px,0)"},setTransition:function(t){v.style.webkitTransition="all "+t+"s",v.style.transition="all "+t+"s"},back:function(){m.translate(0),u=!1,d=!1},addEvent:function(t,e,n){t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent?t.attachEvent("on"+e,n):t["on"+e]=n}};return m.translate(0),m.addEvent(v,"touchstart",e),m.addEvent(v,"touchmove",n),m.addEvent(v,"touchend",o),m.addEvent(v,"mousedown",e),m.addEvent(v,"mousemove",n),m.addEvent(v,"mouseup",o),{setDisable:a,setEnable:s}};return e});