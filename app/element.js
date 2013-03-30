define(["require", "underscore"], function(require,_) {

    var StaticElement = function(tag, id, document) {
        this.tag = tag;
        this.id = id;
        this.document = document;
        this.children = [];
        this._styles = {};
    };

    StaticElement.prototype = {
        getId: function() {
            return this.id;
        },
        appendChild: function(element) {
            this.children.push(element);
        },
        text: function(text) {
            this.innerText = text;
            this.children = [];
        },
        getHtml: function() {
            var html = '<'+this.tag+' id="'+this.id+'"';
            html += ' style="';
            for(var name in this._styles) {
                html += name + ":" + this._styles[name] + ";";
            }
            html += '"';
            html += '>\n' ;
            if(this.innerText) {
                html += this.innerText;
            }
            for(var i=0; i<this.children.length; i++) {
                html += this.children[i].getHtml();
            }
            html += "</" + this.tag + ">\n";
            return html;
        },
        style: function(name, value) {
            if(value !== undefined) {
                this._styles[name] = value;
            }
            return this._styles[name];
        },
        styles: function(object) {
            if(object !== undefined) {
                var _this = this;
                _.each(object, function(value, name){
                    _this._styles[name] = value;
                });
            }
            return this._styles;
        },
        serialize: function() {
            return "document.getElementById('"+this.id+"')";
        }
    };

    return StaticElement;

});


