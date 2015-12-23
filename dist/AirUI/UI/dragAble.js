Air.Module('AirUI.UI.dragAble', function(require){
	var mousePosition = require("UI.mousePosition");
	var offset        = require("UI.offset");
	var eventObject   = require("event.eventObject");
	var setCapture    = require("event.setCapture");
	var releaseCapture= require("event.releaseCapture");

	/**
	 * @module  赋予对象拖动的能力
	 * @author  张有泉 baishuiz@gmail.com
	 * @param   dom {HTML element} 被扩展的 html 元素
	 * @return
	 */
	function dragAble(dom,option) {
		return new dragSprite(dom,option);
		function dragSprite(dom,option){
			option = option || {};
			option.position && (dom.style.position = option.position);
			option.callBack = option.callBack || {};
			option.callBack.moving = option.callBack.moving || function(){};
			option.callBack.stopMove = option.callBack.stopMove || function(){};
			option.callBack.startMove = option.callBack.startMove || function(){};
			option.lock = option.lock || {};
			option.captive = option.captive && [].concat(option.captive) || []; 	//同步移动的对象
			option.ableDisable = option.ableDisable || false ;
			//option.range //范围对象


			this.ableDisable = false;

			var captivePosition = [];

			//更新目标对象位置初始数据
			//getCaptivePosition();
			function getCaptivePosition(){
			   for(var captiveIndex=0; captiveIndex < option.captive.length;captiveIndex++){
				   var currentCaptive = option.captive[captiveIndex];
				   var cLeft = parseInt(currentCaptive.style.left);
				   var cTop = parseInt(currentCaptive.style.top);
				   captivePosition[captiveIndex] = {top:cTop,left:cLeft};
			   }
			}





			var moveHandle = function(lockInfo){
				var result;
				if(lockInfo.v&&lockInfo.h){
					result = function(){};
				}else if(lockInfo.v){
					result = function(dom,tx,ty){
						dom.style.left = tx + 'px';
					}
				}else if(lockInfo.h){
					result = function(dom,tx,ty){
					    dom.style.top = ty + 'px';
					}
				}else {
					result = function(dom,tx,ty){
					    dom.style.left = tx + 'px';
						dom.style.top = ty  + 'px';
					}
				}

				return result;

			}(option.lock)



			//移除拖动能力
			var globalLimit = {};
			function stopDrag(limit){
			    if(!limit){
			        option.ableDisable = true;
				}else {
				    globalLimit = {
					    top:limit.top || null,
						right:limit.right || null,
						bottom:limit.bottom || null,
						left:limit.left || null
					}
				}
			}

			//设置全区偏移限制



			beacon(dom).on('mousedown',startDrag,{preventDefault:true,stopBubble:true});
			function startDrag (e) {
				e = eventObject(e,this); // TODO: 纳入beacon
				e.preventDefault();
		        e.stopBubble();


			    beacon(window).on('blur',stopDrag); // 防止窗口切换返回后，对象继续跟随鼠标移动
			    if(option.ableDisable){
				   stopDrag();
				   return
			    }


				//e.stopPropagation?e.stopPropagation():e.cancelBubble=true;

				var x= e.layerX || e.offsetX;
				var y= e.layerY || e.offsetY;

	            var oPsition = mousePosition(e);
				getCaptivePosition();

				//setCapture(dom,'mousemove');//设置捕获范围
				//setCapture(dom,'mouseup');//设置捕获范围



				//获取目标初始位置
				var domOldPositon = {
				    left : dom.offsetLeft,
					top : dom.offsetTop
				};

				var mouseOld = {x:x,y:y};





				option.callBack.startMove();
				//beacon(dom).on('mousemove',moveing,{windowCapture:true,preventDefault:true});
				setCapture(dom,'mousemove');
				beacon(document).on('mousemove',moveing);
				function moveing(e){

					e = eventObject(e,this); // TODO: 纳入beacon
				    e.preventDefault();
		            //e.stopBubble();




					if(option.ableDisable){
					   stopDrag();
					   return
					}
				    e= e || window.event;
				    //e.stopPropagation();
				    var target = e.target || e.srcElement;
				    e.pageX = e.pageX || e.clientX;

				    var cPsition = mousePosition(e);


					//范围对象的边框宽度
					// 将范围在此处获取 是为防止 范围对象边框动态实时改变
					if (option.range) {
						var regionBorder = {
							top:option.range.clientTop,
							right:option.range.offsetWidth - option.range.clientWidth - option.range.clientLeft,
							bottom:option.range.offsetHeight - option.range.clientHeight - option.range.clientTop,
							left:option.range.clientLeft
						};
					}


					dy = cPsition.globalY - oPsition.globalY;
				    dx = cPsition.globalX - oPsition.globalX;

					if(!e.pageX)e.pageX=e.clientX;
				    if(!e.pageY)e.pageY=e.clientY;
				    //var tx=e.pageX-x;
				    //var ty=e.pageY-y;

					var tx = domOldPositon.left + dx,
					ty = domOldPositon.top + dy;


				    var domOffsePosition = offset(dom);
				    //对象区域限制(同时考虑结构内和结构外)
	                if (option.range ){
					    var rangeOffsePosition = offset(option.range);

					    var tleft = dom.offsetLeft==domOffsePosition.left?tx:domOffsePosition.left+tx;
						var checkRangeRightLimit = dom.offsetLeft==domOffsePosition.left ? rangeOffsePosition.left + option.range.offsetWidth - regionBorder.right : option.range.clientWidth;
						if (option.range && tx+dom.offsetWidth > checkRangeRightLimit ) {
							tx = dom.offsetLeft==domOffsePosition.left ?rangeOffsePosition.left + option.range.offsetWidth - dom.offsetWidth - regionBorder.right:option.range.clientWidth - dom.offsetWidth;
						}else if(option.range && tleft < rangeOffsePosition.left + regionBorder.left){
							tx = dom.offsetLeft==domOffsePosition.left ? rangeOffsePosition.left + regionBorder.left:0;
						}


						var tTop = dom.offsetTop == domOffsePosition.top ? ty :domOffsePosition.top + ty;
						var chenkBottomLimit = dom.offsetTop == domOffsePosition.top ? rangeOffsePosition.top + option.range.offsetHeight - regionBorder.bottom : option.range.clientHeight;
						if (option.range && ty + dom.offsetHeight > chenkBottomLimit ) {
							ty = dom.offsetTop == domOffsePosition.top ? rangeOffsePosition.top + option.range.offsetHeight - dom.offsetHeight - regionBorder.bottom : option.range.clientHeight - dom.offsetHeight;
						}else if(option.range && tTop < rangeOffsePosition.top +  regionBorder.top){
							ty = dom.offsetTop == domOffsePosition.top ? rangeOffsePosition.top +  regionBorder.top :0 ;
						}
					}//对象区域限制结束


					//全局区域限制
					/*var globalLimit = {
					    top:option.globalLimit.top,
						right:xxx,
						bottom:xxx,
						left:xxxx
					};
					*/


					var domOffset = {
					    top:domOldPositon.top + dy,
						right:domOldPositon.left + dom.offsetWidth + dx,
						bottom:domOldPositon.top + dom.offsetHeight + dy,
						left:domOldPositon.left + dx
					};

					if(globalLimit.top&&domOffset.top<=globalLimit.top){
					    ty = globalLimit.top;
					}else if (globalLimit.bottom&&domOffset.bottom>=globalLimit.bottom){
					    ty = globalLimit.bottom - dom.offsetHeight;
					}

					if(globalLimit.left&&domOffset.left<=globalLimit.left){
					    tx = globalLimit.left;
					}else if (globalLimit.right&&domOffset.right>=globalLimit.right){
					    tx = globalLimit.right - dom.offsetWidth;
					}//全局区域限制结束




					moveHandle(dom,tx,ty);



					for(var captiveIndex=0; captiveIndex < option.captive.length;captiveIndex++){
					   var currentCaptive = option.captive[captiveIndex];
					   moveHandle(currentCaptive,captivePosition[captiveIndex].left+dx,captivePosition[captiveIndex].top+dy);
					}

	                var angle = Math.atan2(dy,dx,angle);
					var speed = Math.sqrt(dy*dy+dx*dx);
					speed = Math.sqrt((e.pageX-mouseOld.x)*(e.pageX-mouseOld.x) + (e.pageY-mouseOld.y)*(e.pageY-mouseOld.y));
					mouseOld = {x:e.pageX,y:e.pageY};
					option.callBack.moving({tx:dx,ty:dy,angle:angle,speed:speed});

					//清理选择状态
					if(window.getSelection){//w3c
					   window.getSelection().removeAllRanges();
					 }else  if(document.selection){
					   document.selection.empty();//IE
					 }


					return false

				};

				//document.onmouseup = stopDrag;
				//core.addEventListener(document,'mouseup',stopDrag);

				// beacon(dom).on('mouseup',stopDrag,{windowCapture:true});
				setCapture(dom,'mouseup');
				beacon(document).on('mouseup',stopDrag);
				function stopDrag(){
					e = eventObject(e,this); // TODO: 纳入beacon
				    //e.preventDefault();
		            e.stopBubble();

				    releaseCapture(dom,'mousemove'); //取消捕获范围
					releaseCapture(dom,'mouseup'); //取消捕获范围

					//removeEventListener(dom,'mousemove',moveing,{windowCapture:true});
					//removeEventListener(dom,'mouseup',stopDrag,{windowCapture:true});



		            beacon(document).off('mousemove',moveing);
		            beacon(document).off('mouseup',stopDrag);

	    //             beacon(dom).off('mousemove',moveing,{windowCapture:true});
					// beacon(dom).off('mouseup',stopDrag,{windowCapture:true});
				    getCaptivePosition();
				    option.callBack.stopMove();
				    return false;
				};

				return false

			}

			return {stop:stopDrag}
	    }
	}

	return function(target){
	    var dragSprite;
	    var api = {
	    	startDrag : function (option){
				dragSprite = dragAble(target, option);

				// TODO: stop 事件绑定已入 dragAble 构造函数
				beacon(dragSprite).on("stop", function(e, limit){
					dragSprite.stop(limit)
				})
			},

			stopDrag : function (limit){
				beacon(dragSprite).on("stop", limit);
			},
	    }
		return api;
	};

});
