define(["require", "./browser_element"], function(require, Element) {

    var BrowserDocument = function(realDoc,body) {
        this.realDoc = realDoc;
        this.body = realDoc.body;
    };

    BrowserDocument.prototype = {
        createElement: function(tag) {
            var realEl = this.realDoc.createElement(tag);
            return new Element(realEl);
        },
        getElementById: function(id) {
            var realEl = this.realDoc.getElementById(id);
            return new Element(realEl);
        },
        addEventListener: function(event, func) {
            this.realDoc.addEventListener(event, func);
        }
    };

    return BrowserDocument;

});


