Air.Module('AirUI.UI.Menu', function(require){
  var defaultOptions = {
    display : {
      showClass : '',
      hiddenClass : ''
    }
  }
  function Menu(target, userOptions){
    var options = beacon.utility.merge({},defaultOptions,userOptions);

    function show(){
      var isShowed = hasClass(options.display.showClass);
      if(!isShowed){
        addClass(options.display.showClass);
        removeClass(options.display.hiddenClass);
        beacon(document).once('click', function(e) {
            hidden();
        });
      }
    }

    function hidden(){
      var isShowed = hasClass(options.display.showClass);
      if(isShowed){
        addClass(options.display.hiddenClass);
        removeClass(options.display.showClass);
      }
    }

    function createReg(className){
      var regTemplate = '(^|\\s+)' + className + '(\\s+|$)'
      var reg = new RegExp(regTemplate, 'g')
      return reg;
    }

    function removeClass(className){
      var classList = target.getAttribute('class');
      var reg = createReg(className);
      var newClassList =  classList.replace(reg, ' ');
      target.setAttribute('class',newClassList);
    }

    function addClass(className){
      var classList = target.getAttribute('class');
      target.setAttribute('class', classList + ' ' + className);
    }

    function hasClass(className){
      var classList = target.getAttribute('class');
      var reg = createReg(className);
      var result = reg.test(classList);
      return result;
    }

    var api = {
      show : show,
      hidden: hidden
    };
    return api
  }
  return Menu;
});
