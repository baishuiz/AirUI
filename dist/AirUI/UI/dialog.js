Air.Module('AirUI.UI.dialog', function(require){
    var popWindow = require('AirUI.UI.popWindow')();

    var Dialog = function(config){
        if( !(this instanceof Dialog) ){
            return new Dialog(config);
        }
        var self = this;

        var dom = {};

        function init(){
          dom.dialog = popWindow.root;
          // var dialog = dom.dialog;
          // document.body.appendChild(dialog);
          dom.dialog.id = 'c-dialog';
        }

        var defaultConfig = {};

        this.show = function(title, content){
          var html = '<div class="pdb-bgm"></div><div class="pdb-main">'
                       + '<div class="pdb-title ' + (title ? '' : 'hidden') + '"><h4>'
                       + title
                       + '</h4><div class="border-out"><p class="border-in"><span class="close icon icon-close"  title="关闭浮层">关闭</span></p></div></div><div class="pdb-content"><div class="pdb-contentframe">'
                       + (content || title);
                       + '</div></div><div class="pdb-bottom hidden"></div></div>';
          popWindow.show(html);
          var dialog = dom.dialog;

          dom.main = dialog.querySelector('.pdb-main');
          dom.bgm = dialog.querySelector('.pdb-bgm');
          dom.bodyWrap = dialog.querySelector('.pdb-content');
          dom.body = dom.bodyWrap.querySelector('.pdb-contentframe');
          dom.body.innerHTML = content;
          dom.titleWrap = dialog.querySelector('.pdb-title');
          dom.close = dialog.querySelector('.close');
          // dom.bottom = dialog.querySelector('.pdb-bottom');

          beacon(dom.close).once('click', function(){
            self.close();
          });

          setTimeout(function(){
            dom.bodyWrap.style.height = dom.body.offsetHeight + 'px';
            var mainHeight = dom.titleWrap.offsetHeight + dom.bodyWrap.offsetHeight;
            dom.main.style.height = mainHeight + 'px';
            dom.bgm.style.height = mainHeight + 'px';
            var mainWidth = dom.main.offsetWidth;

            dialog.style.left = document.body.offsetWidth/2 - mainWidth/2 + 'px';
            dialog.style.top = window.innerHeight/2 - mainHeight/2 + 'px';
          }, 1)
        }

        this.close = function(){
          popWindow.close();
        }

        this.root = dom.dialog;

        init();
    };

    return Dialog;
});
