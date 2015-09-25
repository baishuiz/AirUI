Air.Module('UI.mousePosition', function(){

	/*
	 * 获取鼠标坐标
	 * @author  baishuiz@gmail.com  
	 * @param event mouseEvent 事件类型.
	 * @return object 鼠标坐标对象
	*/         
	function getMousePosition(event){
	    event = event || window.event;
	    var mousePosition = {},
	        target = event.target || event.srcElement,
	        doc = document.documentElement || document.body;
	    if(event.pageX && event.layerX) {
	        mousePosition = {
	            globalX : event.pageX,
	            globalY : event.pageY,
	            localX : event.layerX-target.clientLeft,
	            localY : event.layerY-target.clientTop
	        }
	    } else { // for IE
	        mousePosition = {
	            globalX : event.clientX + doc.scrollLeft - doc.clientLeft,
	            globalY : event.clientY + doc.scrollTop - doc.clientTop,
	            localX : event.offsetX, //|| event.x - target.clientLeft,
	            localY : event.offsetY //|| event.y - target.clientTop
	        }          
	    }
	    return mousePosition;
	}
    
    return getMousePosition;
});