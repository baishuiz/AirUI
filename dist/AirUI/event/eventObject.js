Air.Module('AirUI.event.eventObject', function(require){
	/**
	 * @means   增强事件对象
	 * @author  张有泉 baishuiz@gmail.com
	 * @param   event {event object} 事件对象
	 * @return
	 */

	 function eventObject(e,dom){

	    if(!e) return;
		//修正事件对象
		e = e || window.event;

		var getMousePosition = require("AirUI.ui.mousePosition");

		//修正鼠标坐标
		var mousePosition = getMousePosition(e);
		e.globalX = mousePosition.globalX;
		e.globalY = mousePosition.globalY;
		e.localX = mousePosition.localX;
		e.localY = mousePosition.localY;

		//阻止冒泡
		e.stopBubble = e.stopPropagation || function(){this.cancelBubble = true;};

		//阻止默认事件
		e.preventDefault = e.preventDefault || function(){this.returnvalue=false};

		//事件触发对象
		e.currentTarget = e.currentTarget || e.srcElement ;  // IE 的 event.secElement 等同于currentTarget是有别于target的。
		e.target = e.target || dom;

		//相关目标
		e.fromTarget = e.fromElement || e.relatedTarget;
		e.toTarget = e.toElement || e.relatedTarget;

		return e;
	 }

	 return eventObject
});
