Air.Module("AirUI.widget.scrollToBottom",function(t){function o(t,o){t&&beacon(window).on("scroll",function(){var e=i();if(0!==e.top){var l=e.pageHeight-(e.top+e.height);5>=l&&t()&&(window.scrollTo(0,e.pageHeight),o&&o())}})}var i=function(){var t=document.documentElement,o=document.body,i=Math.max(t.scrollLeft,o.scrollLeft),e=Math.max(t.scrollTop,o.scrollTop),l=Math.min(t.clientHeight,o.clientHeight),n=Math.min(t.clientWidth,o.clientWidth),c=Math.max(t.scrollWidth,o.scrollWidth),h=Math.max(t.scrollHeight,o.scrollHeight);return{top:e,left:i,height:l,width:n,pageWidth:c,pageHeight:h}};return{bind:o}});