define(["require", "underscore", "klass"], function(require,_,Klass) {

    var StaticElement = Klass({
        initialize:function(tag, id, document) {
            this.tag = tag;
            this.id = id;
            this.document = document;
            this.children = [];
            this._styles = {};
            this._attrs = {};
            this.events = { };
        },
        on: function(eventName, callback) {
            if(this.events[eventName]) {
               this.events[eventName].push(callback); 
            } else {
               this.events[eventName] = [callback]; 
            }
            return this;
        },
        attr: function(name, value) {
            this._attrs[name] = value;
            return this;
        },
        getId: function() {
            return this.id;
        },
        append: function(elements) {
            var args;

            if(elements instanceof Array) {
                args = elements;
            } else {
                args = Array.prototype.concat.apply([],arguments);
            }

            for(var i=0; i<args.length; i++) {
                this.children.push(args[i]);
            }
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
            html += '" ';
            for(var name in this._attrs) {
                html += name + "=\"" + this._attrs[name] + "\" ";
            }
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
        serialize: function(serialHelper) {
            var output = "function () {";
            output += "var el = document.getElementById('"+this.id+"');\n";
            _.each(this.events, function(eventList, eventName) {
                _.each(eventList, function(eventCallback) {
                    output += "el.addEventListener('" + eventName + "', ";
                    output += "function(e) {\n";
                    output += serialHelper.serialize(eventCallback, serialHelper);
                    output += ".execute(e)\n";
                    output += "}\n";
                    output += " );\n";
                });
            });
            output += "return el;\n";
            output += "}();\n";
            return output;
        }
    });

    return StaticElement;

});


