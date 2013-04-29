define(["require", "klass"], function(require, Klass) {

    var BrowserElement = Klass({
        initialize: function(element) {
            this._el = element;
        },
        getId: function() {
            return this._el.id;
        },
        getElement: function() {
            return this._el;
        },
        append: function(elements) {
            var args;

            if(elements instanceof Array) {
                args = elements;
            } else {
                args = Array.prototype.concat.apply([],arguments);
            }

            for(var i=0; i<args.length; i++) {
                this._el.appendChild(arguments[i].getElement());
            }
        },
        text: function(text) {
            if(text !== undefined) {
                this._el.innerText = text;
            }
            return this.innerText;
        },
        style: function(name, value) {
            if(value !== undefined) {
                this._el.style[name] = value;
            }
            return this._el.style[name];
        },
        styles: function(object) {
            if(object !== undefined) {
                var _this = this;
                for(var name in object) {
                    if(!object.hasOwnProperty(name))
                        continue;
                    this._el.style[name] = object[name];
                };
            }
            return this._el.style[name];
        },
        addEventListener: function(event, func) {
            this._el.addEventListener(event, func);
        },
        offsetWidth: function() {
            return this._el.offsetWidth;
        },
        offsetHeight: function() {
            return this._el.offsetHeight;
        },
        pageXY: function() {

            //TODO:stolen from jquery, cleanup
            var docElem, win,
            elem = this._el,
            box = { top: 0, left: 0 },
            doc = elem && elem.ownerDocument;

            if ( !doc ) {
                return;
            }

            docElem = doc.documentElement;

            // If we don't have gBCR, just use 0,0 rather than error
            // BlackBerry 5, iOS 3 (original iPhone)
            if ( typeof elem.getBoundingClientRect !== undefined ) {
                box = elem.getBoundingClientRect();
            }
            win = window;
            return {
                top: box.top + win.pageYOffset - docElem.clientTop,
                left: box.left + win.pageXOffset - docElem.clientLeft
            };
        }
    });

    return BrowserElement;

});



