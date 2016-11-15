Air.Module('AirUI.widget.Picker', function(require) {
    var ua = navigator.userAgent;
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    var device = {
        isAndroid: ua.match(/(Android);?[\s\/]+([\d.]+)?/),
        isWeixin: /MicroMessenger/i.test(ua)
    };

    function getTranslate(el, axis) {
        var matrix, curTransform, curStyle, transformMatrix;

        // automatic axis detection
        if (typeof axis === 'undefined') {
            axis = 'x';
        }

        curStyle = window.getComputedStyle(el, null);
        if (window.WebKitCSSMatrix) {
            // Some old versions of Webkit choke when 'none' is passed; pass
            // empty string instead in this case
            transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
        } else {
            transformMatrix = curStyle.MozTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
            matrix = transformMatrix.toString().split(',');
        }

        if (axis === 'x') {
            //Latest Chrome and webkits Fix
            if (window.WebKitCSSMatrix)
                curTransform = transformMatrix.m41;
            //Crazy IE10 Matrix
            else if (matrix.length === 16)
                curTransform = parseFloat(matrix[12]);
            //Normal Browsers
            else
                curTransform = parseFloat(matrix[4]);
        }
        if (axis === 'y') {
            //Latest Chrome and webkits Fix
            if (window.WebKitCSSMatrix)
                curTransform = transformMatrix.m42;
            //Crazy IE10 Matrix
            else if (matrix.length === 16)
                curTransform = parseFloat(matrix[13]);
            //Normal Browsers
            else
                curTransform = parseFloat(matrix[5]);
        }

        return curTransform || 0;
    }

    function hasClass(el, cls) {
        return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    function addClass(el, cls) {
        if (!hasClass(el, cls)) {
            el.className += ' ' + cls;
        }
    }

    function removeClass(el, cls) {
        if (hasClass(el, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    }

    function domTransition(el, duration) {
        if (typeof duration !== 'string') {
            duration = duration + 'ms';
        }
        var elStyle = el.style;
        elStyle.webkitTransitionDuration = elStyle.MozTransitionDuration = elStyle.transitionDuration = duration;
    }

    function domTransform(el, transform) {
        var elStyle = el.style;
        elStyle.webkitTransform = elStyle.MozTransform = elStyle.transform = transform;
    }

    function closest(el, selector) {
        var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

        while (el) {
            if (matchesSelector.call(el, selector)) {
                return el;
            } else {
                el = el.parentElement;
            }
        }
        return null;
    }

    function Col(options) {
        options = beacon.utility.merge({
            data: [],
            updateItems: true,
            momentumRatio: 7,
            updateValuesOnTouchmove: true
        }, options);

        var col = this;
        col.data = options.data;
        generateColDom(options.data);

        function generateColDom(data, isReplace) {
            col.items = [];

            var colDom = col.container;
            var colWrapperDom = col.wrapper;
            if (!isReplace) {
                colDom = document.createElement('div');
                colDom.className = 'picker-items-col picker-items-col-center';
                colWrapperDom = document.createElement('div');
                colWrapperDom.className = 'picker-items-col-wrapper';
            }

            var colFragement = document.createDocumentFragment();
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var itemDom = document.createElement('div');
                itemDom.className = 'picker-item';
                itemDom.setAttribute('data-index', i);
                itemDom.innerText = item.value || '';
                colFragement.appendChild(itemDom);
                col.items.push(itemDom);
            }

            if (isReplace) {
                colWrapperDom.innerHTML = '';
                colWrapperDom.appendChild(colFragement);
            } else {
                colWrapperDom.appendChild(colFragement);
                colDom.appendChild(colWrapperDom);

                col.container = colDom;
                col.wrapper = colWrapperDom;
            }
        }


        var wrapperHeight, itemHeight, itemsHeight, minTranslate, maxTranslate;
        col.calcSize = function() {
            var colWidth, colHeight;
            colWidth = 0;
            colHeight = col.container.offsetHeight;
            wrapperHeight = col.wrapper.offsetHeight;
            itemHeight = col.items[0].offsetHeight;
            itemsHeight = itemHeight * col.items.length;
            minTranslate = colHeight / 2 - itemsHeight + itemHeight / 2;
            maxTranslate = colHeight / 2 - itemHeight / 2;
            if (col.width) {
                colWidth = col.width;
                if (parseInt(colWidth, 10) === colWidth) colWidth = colWidth + 'px';
                col.container.style.width = colWidth + 'px';
            }
        };

        // Set Value Function
        col.setValue = function(newActiveIndex, transition, valueCallback, forceTriggerCallBack) {
            col.calcSize();
            if (typeof transition === 'undefined') transition = '';
            if (typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
                return;
            }
            var newTranslate = -newActiveIndex * itemHeight + maxTranslate;
            // Update wrapper
            domTransition(col.wrapper, transition);
            domTransform(col.wrapper, 'translate3d(0,' + (newTranslate) + 'px,0)');

            // Update items
            col.updateItems(newActiveIndex, newTranslate, transition, valueCallback, forceTriggerCallBack);
        };

        col.updateItems = function(activeIndex, translate, transition, valueCallback, forceTriggerCallBack) {
            if (typeof translate === 'undefined') {
                translate = getTranslate(col.wrapper, 'y');
            }
            if (typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - maxTranslate) / itemHeight);
            if (activeIndex < 0) activeIndex = 0;
            if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
            var previousActiveIndex = col.activeIndex;
            col.activeIndex = activeIndex;

            var lastSelectedItem = col.wrapper.querySelector('.picker-selected')
            lastSelectedItem && removeClass(lastSelectedItem, 'picker-selected');


            var selectedItem = col.items[activeIndex];
            if (selectedItem) {
                addClass(selectedItem, 'picker-selected');
                domTransform(selectedItem, '');

                // Update values
                var selectedIndex = +selectedItem.getAttribute('data-index');
                col.value = options.data[activeIndex];
            }

            if (valueCallback) {
                // On change callback
                if ((previousActiveIndex !== activeIndex) || forceTriggerCallBack) {
                    if (valueCallback) {
                        valueCallback(col.value, col);
                    }
                }
            }
        };

        col.initVal = function() {
            var activeIndex, translate;
            if (col.data && col.value) {
                var machedIndex = col.data.indexOf(col.value);
                activeIndex = machedIndex !== -1 ? machedIndex : 0;
                translate = machedIndex !== -1 ? currentTranslate : maxTranslate;
            } else {
                activeIndex = 0;
                translate = maxTranslate;
            }
            // Update items on init
            if (options.updateItems) col.updateItems(activeIndex, translate, 0);

            if (!col.items || !col.items.length) {
                return
            };
            col.calcSize();
            domTransform(col.wrapper, 'translate3d(0,' + translate + 'px,0)');
            domTransition(col.wrapper, 0);
        }
        col.initVal();

        var activeIndex = 0;
        var animationFrameId;

        col.refresh = function(data) {
            options.data = data;
            col.data = options.data;
            generateColDom(data, true);
            var machedIndex = col.data.indexOf(col.value);
            var activeIndex = machedIndex !== -1 ? machedIndex : 0;
            col.setValue(activeIndex, 0);
        }

        var allowItemClick = true;
        var isTouched, isMoved, touchStartY, touchCurrentY, touchStartTime, touchEndTime, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;

        function handleTouchStart(e) {
            if (isMoved || isTouched) return;
            e.preventDefault();
            isTouched = true;
            touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            touchStartTime = (new Date()).getTime();

            allowItemClick = true;
            startTranslate = currentTranslate = getTranslate(col.wrapper, 'y');
        }

        var currentTranslate, prevTranslate;

        function handleTouchMove(e) {
            touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
            if (!isMoved) {
                // First move
                isMoved = true;
                startTranslate = currentTranslate = getTranslate(col.wrapper, 'y');
                domTransition(col.wrapper, 0);
            }
            e.preventDefault();

            var diff = touchCurrentY - touchStartY;
            currentTranslate = startTranslate + diff;
            returnTo = undefined;

            // Normalize translate
            if (currentTranslate < minTranslate) {
                currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
                returnTo = 'min';
            }
            if (currentTranslate > maxTranslate) {
                currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
                returnTo = 'max';
            }

            // Transform wrapper
            domTransform(col.wrapper, 'translate3d(0,' + currentTranslate + 'px,0)');

            // Update items
            col.updateItems(undefined, currentTranslate, 0, options.onChange);

            // Calc velocity
            velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
            velocityTime = (new Date()).getTime();
            prevTranslate = currentTranslate;
        }

        function handleTouchEnd(e) {
            if (!isTouched || !isMoved) {
                isTouched = isMoved = false;
                return;
            }

            isTouched = isMoved = false;
            domTransition(col.wrapper, '');
            if (returnTo) {
                if (returnTo === 'min') {
                    domTransform(col.wrapper, 'translate3d(0,' + minTranslate + 'px,0)');
                } else {
                    domTransform(col.wrapper, 'translate3d(0,' + maxTranslate + 'px,0)');
                }
            }
            touchEndTime = new Date().getTime();
            var velocity, newTranslate;
            if (touchEndTime - touchStartTime > 300) {
                newTranslate = currentTranslate;
            } else {
                velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
                newTranslate = currentTranslate + velocityTranslate * options.momentumRatio;
            }

            newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);

            // Active Index
            var activeIndex = -Math.floor((newTranslate - maxTranslate) / itemHeight);

            newTranslate = -activeIndex * itemHeight + maxTranslate;

            // Transform wrapper
            domTransform(col.wrapper, 'translate3d(0,' + (parseInt(newTranslate, 10)) + 'px,0)');

            // Update items
            col.updateItems(activeIndex, newTranslate, '', options.onChange);

            // Allow click
            setTimeout(function() {
                allowItemClick = true;
            }, 100);
        }

        // function handleClick(e) {
        //     if (!allowItemClick) return;
        //     var target = e.target;
        //     var index = +target.getAttribute('data-index');
        //     col.setValue(index);
        // }


        col.initEvents = function(detach) {
            var method = detach ? 'remove' : 'add';
            var eventName = method + 'EventListener';
            col.container[eventName]('touchstart', handleTouchStart);
            col.container[eventName]('touchmove', handleTouchMove);
            col.container[eventName]('touchend', handleTouchEnd);
            // for (var i = 0; i < col.items.length; i++) {
            //     col.items[i][eventName]('click', handleClick);
            // }
        };
        col.destroyEvents = function() {
            col.initEvents(true);
        };

        col.container.f7DestroyPickerCol = function() {
            col.destroyEvents();
        };

        col.initEvents();

        return col;
    }

    function Picker(options) {
        var picker = this;
        picker.cols = [];
        picker.opened = false;

        options = beacon.utility.merge({
            input: null,
            containerClass: '',
            cols: [],
            title: '请选择',
            inputReadOnly: true
        }, options);
        options = options || {};

        function colOnChangeFn() {
            picker.updateValue();
        }

        function generatePickerDom(cols) {
            picker.cols = [];
            var pickerDom = document.createElement('div');
            pickerDom.className = 'picker-modal picker-columns remove-on-close ' + options.containerClass;
            pickerDom.innerHTML = ' <header class="bar bar-nav">' +
                (options.cancel ? '<button class="button button-link pull-left close-picker js-cancel">' + options.cancel + '</button>' : '') +
                (options.confirm ? '<button class="button button-link pull-right close-picker js-confirm">' + options.confirm + '</button>' : '') +
                '<h1 class="title">' + options.title + '</h1>' +
                '</header>' +
                '<div class="picker-modal-inner picker-items">' +
                '<div class="picker-center-highlight"></div>' +
                '</div>';
            var pickerItems = pickerDom.querySelector('.picker-items');

            var pickerItemsFragment = document.createDocumentFragment();
            for (var i = 0; i < cols.length; i++) {
                var colData = cols[i];
                var col = new Col({
                    data: colData,
                    onChange: colOnChangeFn
                });
                picker.cols.push(col);
                pickerItemsFragment.appendChild(col.container);
            }

            pickerItems.appendChild(pickerItemsFragment);

            document.body.appendChild(pickerDom);

            picker.confirmBtn = pickerDom.querySelector('.js-confirm');
            picker.cancelBtn = pickerDom.querySelector('.js-cancel');
            picker.confirmBtn && picker.confirmBtn.addEventListener('click', picker.select);
            picker.cancelBtn && picker.cancelBtn.addEventListener('click', picker.close);

            picker.container = pickerDom;
        }

        picker.updateValue = function(isSelect) {
            var newValue = [];
            var newDisplayValue = [];
            for (var i = 0; i < picker.cols.length; i++) {
                newValue.push(picker.cols[i].value);
            }
            options.onChange && options.onChange(newValue, picker);
            if (newValue.indexOf(undefined) >= 0) {
                return;
            }

            if (isSelect) {
                picker.close();
                picker.value = newValue;
                if (options.onSelect) {
                    options.onSelect(picker.value, picker);
                }
            }
        };

        picker.open = function() {
            if (!picker.opened) {
                // Layout
                if (!picker.initialized) {
                    generatePickerDom(options.cols);
                }

                // Opend
                picker.opened = true;

                // Store picker instance
                picker.container.f7Picker = picker;

                picker.container.style.display = 'block';
                // Set value
                if (!picker.initialized) {
                    if (options.value) {
                        picker.value = options.value;
                        picker.setValue(options.value, 0, true);
                    }
                } else {
                    if (picker.value) {
                        picker.setValue(picker.value, 0);
                    }
                }

                setTimeout(function() {
                    removeClass(picker.container, 'modal-out');
                    addClass(picker.container, 'modal-in');
                }, 18);
            }

            // Set flag
            picker.initialized = true;
        };

        picker.select = function() {
            picker.updateValue(true);
        }

        // Close
        picker.close = function() {
            if (!picker.opened) return;
            removeClass(picker.container, 'modal-in');
            addClass(picker.container, 'modal-out');
            picker.opened = false;
            return;
        };

        // Destroy
        picker.destroy = function() {
            picker.close();
            if (options.input) {
                options.input.removeEventListener('click', openOnInput);
            }
            picker.confirmBtn && picker.confirmBtn.removeEventListener('click', picker.select);
            picker.cancelBtn && picker.cancelBtn.removeEventListener('click', picker.close);
            document.removeEventListener('click', closeOnHTMLClick);
        };

        picker.setValue = function(arrValues, transition, isInit) {
            var valueIndex = 0;
            for (var i = 0; i < options.cols.length; i++) {
                var col = picker.cols[i];
                var colData = isInit ? options.cols[i] : col.data;
                if (colData && col) {
                    var value = arrValues[i];
                    var index = colData.indexOf(value);
                    col.setValue(index, transition, colOnChangeFn, true);
                }
            }
        }

        picker.refresh = function(colIndex, data){
            var col = picker.cols[colIndex];
            if (!col) {
                return;
            }

            col.value = picker.value[colIndex];
            col.refresh(data);
        }

        // Input Events
        function openOnInput(e) {
            e.preventDefault();
            // 安卓微信webviewreadonly的input依然弹出软键盘问题修复
            if (device.isWeixin && device.android && options.inputReadOnly) {
                this.focus();
                this.blur();
            }
            if (picker.opened) return;
            picker.open();
        }

        function closeOnHTMLClick(e) {
            if (!picker.opened) return;
            var target = e.target;
            var closestPickerModal = closest(target, '.picker-modal');
            if (options.input) {
                if (target !== options.input && !closestPickerModal) {
                    picker.close();
                }
            }
        }

        if (options.input) {
            options.input.addEventListener('click', openOnInput);
        }
        document.addEventListener('click', closeOnHTMLClick)

        return picker;
    }

    return Picker;
});
