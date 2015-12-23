Air.Module('AirUI.UI.popWindow', function(require){
    var mask = require('AirUI.UI.mask');
    var maskLayer = mask();

    function PopWindow(config){
        if( !(this instanceof PopWindow) ){
            return new PopWindow(config);
        }

        var dom = {
        	popWindow : generateElement(),
        	container : generateElement()
        }

        function generateElement(){
        	var element = document.createElement('div');
        	return element;
        }

        function init(){
        	dom.container.style.position = 'absolute';
        	dom.container.style.width    = '100%';
        	dom.container.style.height   = '100%';
        	dom.container.display        = 'none';

        	//dom.container.appendChild(maskLayer);
        	//dom.container.appendChild(dom.popWindow);

        	// maskLayer.show();



        	document.body.appendChild(dom.popWindow);

        }

        var defaultConfig = {};

        this.show = function(content){
        	
        	dom.popWindow.innerHTML = content || '';

            dom.container.style.display = 'block';

        	dom.popWindow.style.position = 'absolute';
                    	
            dom.popWindow.style.left = document.body.offsetWidth/2-dom.popWindow.offsetWidth/2 + 'px'
        	dom.popWindow.style.top = window.innerHeight/2-dom.popWindow.offsetHeight/2 + 'px'



            maskLayer.show();
        }

        this.close = function(){
            dom.container.style.display = 'none';
            maskLayer.hidden();
        }

        init();
    }

    
    return PopWindow;
})