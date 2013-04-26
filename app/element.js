define(["require", "underscore"], function(require,_) {

    var StaticElement = function(tag, id, document) {
        this.tag = tag;
        this.id = id;
        this.document = document;
        this.children = [];
        this._styles = {};
        this.events = { };
    };

    StaticElement.prototype = {
        on: function(eventName, callback) {
            if(this.events[eventName]) {
               this.events[eventName].push(callback); 
            } else {
               this.events[eventName] = [callback]; 
            }
            return this;
        },
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
        serialize: function(serialHelper) {
            //var objId = serialHelper.objString();
            //var output = "var " + objId + "=";
            var output = "function () {";
            output += "var el = document.getElementById('"+this.id+"');\n";
            for(var event in this.events) {
                for(var i=0; i<this.events[event].length; i++) {
                    output += "el.addEventListener('" + event + "', ";
                    output += "function(e) {\n";

                    output += serialHelper.serialize(this.events[event][i], serialHelper);
                    //output += this.events[event][i].objectId;
                    output += ".execute(e)\n";
                    output += "}\n";
                    output += " );\n";
                }
            }
            output += "return el;\n";
            output += "}();\n";
            //serialHelper.write(output);
            return output;
        }
    };

    return StaticElement;

});


