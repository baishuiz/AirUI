Air.Module("AirUI.UI.imgCamera",function(require){function t(t,s,l){function h(t){var s=document.createElement("div");return t.parentNode.insertBefore(s,t),s.appendChild(t),s.style.width=a.width+"px",s.style.height=a.height+"px",s.className="cut-img-wrap",s}if(!t)throw Error("nedd img Element");var n=document.defaultView.getComputedStyle(t,null).transition;t.style.transition="none";var a={width:s,height:l,top:t.clientTop,left:t.clientLeft,scaleX:1,scaleY:1,url:t.getAttribute("src")};t.style.transition=n;var c={CUT:2,AUTO:4,SCALING:8};this.stretch=c.AUTO,this.picture=t,this.scene=h(t),this.setURL=function(t){_url=t,this.picture.src=_url},this.setSize=function(s,l){a.scaleX=s||a.scaleX,a.scaleY=l||a.scaleY,t.style.width=a.width*s+"px",t.style.height=a.height*l+"px"};var o={top:0,right:0,bottom:0,left:0};this.translateTo=function(t){var s=this.picture,l=this.scene;o.top=o.top+t.y*a.scaleY,o.right=o.right+t.x*a.scaleX+t.width,o.bottom=o.bottom+t.y*a.scaleY+t.height,o.left=o.left+t.x*a.scaleX;var h="rect("+[t.y*a.scaleY+"px",t.x*a.scaleX+t.width+"px",t.y*a.scaleY+t.height+"px",t.x*a.scaleX+"px"].join(",")+")";s.style.clip=h,s.style.position="absolute",s.style.left=a.left-t.x*a.scaleX+"px",s.style.top=a.top-t.y*a.scaleY+"px",l.style.width=t.width+"px",l.style.height=t.height+"px"}}var s=function(s,l,h){var n=new t(s,l,h);return n};return s});