/**
 * @means   Ê¹µ±Ç°ÎÄµµ²»ÔÙ²¶»ñÊó±êÊÂ¼þ£¬ÊÇSetCapture·½·¨µÄ·´²Ù×÷
 * @author  ÕÅÓÐÈª baishuiz@gmail.com
 * @param   dom {HTML element} ÊÂ¼þ¼àÌýÕß
 * @return  
 * @extend http://msdn.microsoft.com/en-us/library/ms536689.aspx
 * @extend https://developer.mozilla.org/en/DOM/window.releaseEvents
 */		
 Air.Module('AirUI.event.releaseCapture', function(require){
	 function releaseCapture(dom,eventType){

		if(dom.releaseCapture){
			dom.releaseCapture();
		}else if(window.releaseEvents){
			var eventTypeCollection = {
				mousedown: Event.MOUSEDOWN,
				mouseup:   Event.MOUSEUP,
				mousemove: Event.MOUSEMOVE,
				click:     Event.CLICK,
				dblclick:  Event.DBLCLICK,
				mouseover: Event.MOUSEOVER,
				mouseout:  Event.MOUSEOUT
			};	
			window.releaseEvents(eventTypeCollection[eventType]);
		}	
	 }
	 return releaseCapture;
});