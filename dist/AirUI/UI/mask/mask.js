Air.Module('AirUI.ui.mask', function(require){
    
    
    function Mask  (config){

    	if( !(this instanceof Mask) ){
            return new Mask(config);
    	}

    	var defaultStyle = {
    		position : 'absolute',
    		width    : '100%',
    		height   : '100%',
    		background : 'black'
    	}

    	var dom = {
            maskLayer : generateElement()
    	}

    	function generateElement(){
            var maskLayer = dom.maskLayer || document.createElement('div');
            return maskLayer;
    	}

    	this.show = function(){
    		// merge config
    		// show dom
    		dom.maskLayer.style.display = 'block';
    	}

    	this.hidden = function(){
            // hidden dom
    	}
    }

    return Mask;
})