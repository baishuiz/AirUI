b.Module('AirUI.UI.toast', function(require){
  var dialog = require('AirUI.UI.dialog');
  var detailDialog = dialog({needMask: false});

  function show(content) {

    detailDialog.show(content);

    setTimeout(function(){

      detailDialog.close(content);

    },1000)

  }

  return {
    show: show,
  }

});
