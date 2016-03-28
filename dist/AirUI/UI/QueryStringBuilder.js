Air.Module('AirUI.UI.QueryStringBuilder', function(require){
  var QueryStringBuilder = function (baseQueryString) {
    var me = arguments.callee;
    if (!(this instanceof me)) {
       return new me(baseQueryString);
    }

    function getIndex(key) {
       key = key && key.toLowerCase();
       return base.ArrayIndexOf(keyMap, key);
    }

    var keyMap = [];
    var names = [];
    var values = [];
    var model = {};

    if (baseQueryString) {
       var collections = baseQueryString.split('&');
       if (collections) {
           for (var i = collections.length - 1; i >= 0; i--) {
               var keyValue = collections[i];
               var keyValueArr = keyValue && keyValue.split('=');
               var key = keyValueArr && keyValueArr[0];
               var value = keyValueArr && keyValueArr[1];
               if (key) {
                   model[key] = value;
                   set(key, value);
               }
           };
       }

    }

    function set(key, value) {
       if (key && value) {
           //keyMap.push(key.toLowerCase());
           var index = getIndex(key);
           if (index >= 0 && index < values.length) {
               values[index] = value;
           } else {
               names.push(key);
               values.push(value);
               keyMap.push(key.toLowerCase());
           }
           model[key] = value;
       }
       return value;
    }


    function get(key) {

       var result = key ? values[getIndex(key)] : model;
       return result;
       //return key ? model[key] : model;
    }

    function remove(key) {
       var _model = model;
       var index = getIndex(key);
       if (key && index > 0) {
           delete model[key];
           names.splice(index, 1);
           values.splice(index, 1);
           keyMap.splice(index, 1);
       } else {
           model = {};
           names = [];
           values = [];
           keyMap = [];
       }
    }

    var encodeURI = function (str) {
       try {
           str = str ? decodeURIComponent(str) : '';
       } catch (e) { };

       return encodeURIComponent(str).replace(/\*/g, "%2A").replace(/-/g, "%2D").replace(/_/g, "%5F").replace(/\./g, "%2E").replace(/!/g, '%21').replace(/~/g, '%7E').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29');
    };
    this.set = set;
    this.get = get;
    this.remove = remove;
    this.toString = function (t1, t2) {
       t1 = t1 || '=';
       t2 = t2 || '&';
       var result = [];
       for (var index = 0; index < names.length; index++) {
           if (values[index]) {
               result.push(encodeURI(names[index]) + t1 + encodeURI(values[index]));
           }
       }
       return result.join(t2) || '';
    }
  }
  return QueryStringBuilder;
});
