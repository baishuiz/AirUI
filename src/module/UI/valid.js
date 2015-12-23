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
        function bindEvents() {
            eachConfig(function(target, activeConfig){
                beacon(target).on(activeConfig.onevent, function(e){
                    var result = validRule(activeConfig.rule);
                    if(result.length > 0) {
                        e.preventDefault();
                    }
                });
            });
        }

        function eachConfig(callback){
            for(var index = 0; index < config.length; index++) {
                var activeConfig = config[index];
                var target = document.querySelector(activeConfig.target);
                callback && callback(target, activeConfig);
            }
        }

        function validRule(rules){
            var error = [];
            var success = [];
            for(var index = 0; index < rules.length; index++) {
                var activeRule = rules[index];
                var activeElement = document.querySelector(activeRule.target);


                if(beacon.utility.isType(activeRule.rule, 'Function')) {
                    var isInvalid = !activeRule.rule(activeElement.value);
                } else {
                    var isInvalid = !activeElement.value.match(activeRule.rule);
                }


                if(isInvalid){
                    error.push(activeRule);
                } else {
                    success.push(activeRule);
                }
            }

            if(error.length > 0){
                beacon(self).on(self.EVENT.ERROR, error);
            } else {
                beacon(self).on(self.EVENT.SUCCESS, success);
            }

            return error;
        }

        bindEvents();

        this.valid = function() {
            var result = [];
            eachConfig(function(target, activeConfig){
                var valid = validRule(activeConfig.rule);
                if (valid.length > 0) {
                    result.push(activeConfig);
                }
            });
            return result;
        }

    }

    return Valid;
});
