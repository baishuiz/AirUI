Air.Module("AirUI.ui.offset", function(require){
	/**
	 * @module  获取对象相对于body的位置信息
	 * @author  张有泉 baishuiz@gmail.com
	 * @param   dom {HTML element} 待检测的精灵
	 * @return  json object   返回相对于body的全局偏移量{top,right,bottom,left}
	 */
	 function offset(dom) {
		var globalPosition = {
		    top:dom.offsetTop,
			right:dom.offsetParent.clientWidth - dom.offsetLeft - dom.offsetWidth ,
			bottom:dom.offsetParent.clientHeight - dom.offsetTop - dom.offsetHeight ,
			left:dom.offsetLeft
		};

		while (dom = dom.offsetParent){

			var domBorder = {
			    top:dom.clientTop,
				right:dom.offsetWidth - dom.clientLeft - dom.clientWidth,
				bottom:dom.offsetHeight - dom.clientTop - dom.clientHeight,
				left:dom.clientLeft
			};
			var parent = dom.offsetParent || (dom.parentElement||dom.parentNode);
			globalPosition = {
				top : globalPosition.top + dom.offsetTop + domBorder.top,
				right : globalPosition.right + parent.clientWidth - dom.offsetLeft - dom.offsetWidth + domBorder.right,
				bottom: globalPosition.bottom + parent.clientHeight - dom.offsetTop - dom.offsetHeight + domBorder.bottom ,
				left : globalPosition.left + dom.offsetLeft + domBorder.left
			};
		}
		return globalPosition
	 }

	 return offset;
});
