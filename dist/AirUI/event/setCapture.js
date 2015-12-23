/**
 * @means   使鼠标事件被当前文档捕获，一旦窗口捕获到鼠标事件，无论鼠标是否在窗口范围内都将延续事件响应
 * @author  张有泉 baishuiz@gmail.com
 * @param   dom {HTML element} 事件监听者
 * @return  
 * @extend http://msdn.microsoft.com/en-us/library/ms536742.aspx
 * @extend https://developer.mozilla.org/en/window.captureEvents
 */		
 
 Air.Module('AirUI.event.setCapture', function(require){
	 function setCapture(dom,eventType){

		if(dom.setCapture){ 
		  dom.setCapture();
		}else if(window.captureEvents){ 
			var eventTypeCollection = {
				mousedown: Event.MOUSEDOWN,
				mouseup:   Event.MOUSEUP,
				mousemove: Event.MOUSEMOVE,
				click:     Event.CLICK,
				dblclick:  Event.DBLCLICK,
				mouseover: Event.MOUSEOVER,
				mouseout:  Event.MOUSEOUT
			};	
		  window.captureEvents(eventTypeCollection[eventType]);
		} 		
	 }
	 return setCapture;
});