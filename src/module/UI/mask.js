Air.Module('AirUI.UI.mask', function(require){


    function Mask(config){

        if( !(this instanceof Mask) ){
            return new Mask(config);
        }

        var self = this;

        var defaultStyle = {
            position      : 'fixed',
            width         : '100%',
            height        : '100%',
            background    : '#000',
            top           : '0',
            left          : '0',
            opacity       : '0.5',
            '-webkit-touch-callout': 'none',
            '-webkit-user-select' : 'none',
            '-moz-user-select' : 'none',
            '-ms-user-select' : 'none',
            'user-select' : 'none'
        }

        var dom = {
            maskLayer : generateElement()
        }

        beacon(dom.maskLayer).on('click', function(){
            self.hidden();
        })

        function generateElement(){
            var maskLayer = document.createElement('div');
            document.body.appendChild(maskLayer);
            return maskLayer;
        }

        function setStyle(config){
            config = config || {};
            beacon.blend(config, defaultStyle, {cover:false});
            var cssText = '';
            for(var item in config){
                cssText += item + ':' + config[item] + ';';
            }
            dom.maskLayer.style.cssText = cssText;
        }



        function disableScroll(){
            beacon(dom.maskLayer).on('mousewheel', function(e){
                e.preventDefault();
            })
        }

        function enableScroll(){
            beacon(dom.maskLayer).off('mousewheel');
        }


        this.show = function(){
            setStyle({display:'block'});
            disableScroll();
        }

        this.hidden = function(){
            setStyle({display:'none'});
            enableScroll();
        }

        this.root = dom.maskLayer;


    }

    return Mask;
})
