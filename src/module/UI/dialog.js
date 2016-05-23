Air.Module('AirUI.UI.dialog', function(require){
    var popWindow = require('AirUI.UI.popWindow')();
    var delegate = function (target, className, root, callback) {
      if (target === root) {
        return;
      }
      if (target.className.indexOf(className) !== -1) {
        callback(target);
      } else {
        delegate(target.parentNode, className, root, callback)
      }
    };

    var Dialog = function(config){
        if( !(this instanceof Dialog) ){
            return new Dialog(config);
        }
        var self = this;

        var dom = {};

        function init(){
            dom.dialog = popWindow.root;
            dom.dialog.id = 'c-dialog';

            beacon(dom.dialog).on('click', function(e){
                var target = e.target || e.srcElement;
                delegate(target, 'js-close', dom.dialog, function (elm) {
                    self.close();
                });
            });
        }

        var defaultConfig = {};

        this.show = function(options){
            options = options || {};
            var title = typeof options.title === 'string' ? options.title : '消息提示';
            var content = options.content;
            var bottomBtns = typeof options.bottomBtns === 'boolean' ? options.bottomBtns : false;
            var html = '<div class="pdb-bgm"></div><div class="pdb-main">'
                           + '<div class="pdb-title "><h4>'
                           + title
                           + '</h4><div class="border-out"><p class="border-in"><span class="js-close close icon icon-close"  title="关闭浮层">关闭</span></p></div></div><div class="pdb-content"><div class="pdb-contentframe">'
                           + (typeof content === 'string' ? content : '')
                           + '</div></div><div class="pdb-bottom ' + (bottomBtns ? '' : 'hidden') + ' textcenter">'
                           + (bottomBtns ? '<a class="dialog-btn btn-action js-ok"><em>确定</em></a><a class="dialog-btn btn-cancel js-cancel"><em>取消</em></a>' : '')
                           + '</div></div>';

            popWindow.show(html);

            setTimeout(function(){
                var dialog = dom.dialog;

                dom.main = dialog.querySelector('.pdb-main');
                dom.bgm = dialog.querySelector('.pdb-bgm');
                dom.bodyWrap = dialog.querySelector('.pdb-content');
                dom.body = dom.bodyWrap.querySelector('.pdb-contentframe');

                if (content && content.nodeType === 1) {
                    content = content.cloneNode(true);
                    dom.body.appendChild(content);
                    content.style.display = 'block';
                }
                dom.titleWrap = dialog.querySelector('.pdb-title');
                dom.close = dialog.querySelector('.close');
                dom.bottom = dialog.querySelector('.pdb-bottom');

                beacon(dom.bottom).once('click', function(e){
                    var target = e.target || e.srcElement;
                    delegate(target, 'js-ok', dom.dialog, function (elm) {
                        options.okAction && options.okAction(elm);
                        self.close();
                    });
                    delegate(target, 'js-cancel', dom.dialog, function (elm) {
                        options.cancelAction && options.cancelAction(elm);
                        self.close();
                    });
                });

                dom.bodyWrap.style.height = dom.body.offsetHeight + 'px';
                var mainHeight = dom.titleWrap.offsetHeight + dom.bodyWrap.offsetHeight + dom.bottom.offsetHeight;
                dom.main.style.height = mainHeight + 'px';
                dom.bgm.style.height = mainHeight + 'px';
                var mainWidth = dom.main.offsetWidth;

                dialog.style.left = document.body.offsetWidth/2 - mainWidth/2 + 'px';
                dialog.style.top = window.innerHeight/2 - mainHeight/2 + 'px';
            }, 0);
        }

        this.close = function(){
            popWindow.close();
        }

        this.root = dom.dialog;

        init();
    };

    return Dialog;
});
