Air.Module("AirUI.UI.hares",function(){function t(t){return t&&(a=t),n(),a}function n(){window.clearInterval(p),p=window.setInterval(c,1e3/a)}var r,a=25,e=[],o={x:"left",y:"top"},i={alpha:!0,opacity:!0},u=function(t,n){r=t,n=n||{}},f=function(t){t&&e.push(t)},c=function(){window.clearInterval(p);for(var t=0,n=e.length;n>t;t++)e[t]();p=window.setInterval(c,1e3/a)},p=t(a),l=function(){};l.dom=[];var s=function(t){return t in o&&(t=o[t]),t};l.getStep=function(t,n,r){},l.layout=function(t,n,r,e){var o=parseInt(y(n,t))||0,i=(e-o)/(a*r),u=function(n,r){var a=o,i=!1;return function(){a+=r;var o=Math.round(a);i||(y(n,t,o+"px"),i=i||e==Math.abs(o))}};f(u(n,i))},l.alpha=l.opacity=function(t,n,r){var e="undefined"==typeof t.style.opacity?l.alpha.forIE:l.alpha.forW3c,o=e(t),i=(r-o)/(a*n),u=function(t,n){var a=o,i=!1;return function(){a+=n;var o=a;i||(e(t,o),i=i||Math.abs(r-o)<.001)}};f(u(t,i))},l.alpha.forIE=function(t,n){return n&&(t.style.filter="alpha(opacity="+100*n+")"),n=y(t,"opacity",n),parseInt(n)},l.alpha.forW3c=function(t,n){return n=y(t,"opacity",n),parseInt(n)};var v=function(t,n){for(var r in n)t[newattr]=n[r]},y=function(t,n,r){n=n.replace(/-(.)/gi,function(t){return t.toUpperCase().substring(1)}),r&&(t.style[n]=r);var a=window.getComputedStyle?window.getComputedStyle(t,null)[n]:t.currentStyle[n];return a},h=function(t,n,r,a){if(r&&t){n=n||0,a=a||{},t.Hares=t.Hares||{};var e=t.Hares.animationQuery||[];a.stopBefor&&(e=[],e.push(r)),a.overrideCurrent&&(e[0]=v(e[0],r)),t.Hares.animationQuery=e;for(attr in r){var o=s(attr);i[o]?l[o](t,n,r[attr]):l.layout(o,t,n,r[attr])}return this}},d=function(t,n,r){if(r&&t){n=n||0;for(attr in r){var a=s(attr),e=parseInt(y(t,a))||0;i[a]?l[a](t,n,e+r[attr]):l.layout(a,t,n,e+r[attr])}}};return u.prototype={moveTo:h,moveBy:d,moveFrom:function(){},frame:t},new u});