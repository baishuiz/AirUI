Air.Module('AirUI.UI.valid', function(require){
    function Valid(config) {
        
        if(!(this instanceof Valid)){
            return new Valid(config);
        }

        this.EVENT = {
            ERROR :  beacon.createEvent(''),
            SUCCESS : beacon.createEvent('')
        };


        var self = this;

        function eachConfig(){
            for(var index = 0; index < config.length; index++) {
                var activeConfig = config[index];
                var target = document.querySelector(activeConfig.target);
                beacon(target).on(activeConfig.onevent, function(e){
                    var result = validRule(activeConfig.rule);
                    if(result.length > 0) {
                        e.preventDefault();
                    }
                });
            }           
        }

        function validRule(rules){
            var result = [];
            for(var index = 0; index < rules.length; index++) {
                var activeRule = rules[index];
                var activeElement = document.querySelector(activeRule.target);
                

                if(beacon.utility.isType(activeRule.rule, 'Function')) {
                    var isInvalid = !activeRule.rule(activeElement.value);
                } else {
                    var isInvalid = !activeElement.value.match(activeRule.rule);    
                }


                if(isInvalid){
                    result.push(activeRule);
                }
            }

            if(result.length > 0){
                beacon(self).on(self.EVENT.ERROR, result);
            } else {
                beacon(self).on(self.EVENT.SUCCESS);
            }

            return result;
        }

        eachConfig();




    }

    return Valid;
});