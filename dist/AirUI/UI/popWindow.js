Air.Module('AirUI.UI.popWindow', function(require){
    var mask = require('AirUI.UI.mask');
    var maskLayer = mask();

    function PopWindow(config){
        if( !(this instanceof PopWindow) ){
            return new PopWindow(config);
        }
        var self = this;

        var dom = {
            popWindow : generateElement()
        }

        function generateElement(){
            var element = document.createElement('div');
            return element;
        }

        function init(){
            document.body.appendChild(dom.popWindow);
            beacon(maskLayer.root).on('click', function(e) {
                self.close();
            });

        }

        var defaultConfig = {};

        this.show = function(content){

            dom.popWindow.innerHTML = content || '';

            dom.popWindow.style.display = 'block';

            dom.popWindow.style.position = 'fixed';

            dom.popWindow.style.left = document.body.offsetWidth/2-dom.popWindow.offsetWidth/2 + 'px'
            dom.popWindow.style.top = window.innerHeight/2-dom.popWindow.offsetHeight/2 + 'px'

            maskLayer.show();
        }

        this.close = function(){
            dom.popWindow.style.display = 'none';
            maskLayer.hidden();
        }

        this.root = dom.popWindow;

        init();
    }


    return PopWindow;
})
