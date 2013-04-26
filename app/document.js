define(["require", "./element"], function(require, Element) {

    var StaticDocument = function() {
        this.elCount = 0;
        this.body = this.createElement("body");
        this.scripts = [];
        this.events = { };
    };

    StaticDocument.prototype = {
        createElement: function(tag) {
            this.elCount++;
            return new Element(tag, "dom_el_" + this.elCount, this);
        },
        addScript: function(src, content) {
            this.scripts.push({src:src, content:content});
        },
        getOutput: function(name) {
            var html = "<!doctype html>\n";
            html += "<html>\n";
            html += "<head>\n";
            for(var i=0; i<this.scripts.length; i++) {
                if(this.scripts[i].src) {
                    html += '<script src="'+this.scripts[i].src+'">\n';
                } else {
                    html += '<script>\n';
                    html += this.scripts[i].content;
                }
                html += "</script>\n";
            }
            html += "</head>\n";
            html +=  this.body.getHtml();
            html += "</html>";
            return html;
        },
        getModule: function() {
            return "app/browser_document";
        },
        serialize: function(serialHelper) {
            //serialHelper.write("document");
            var output = "function () {";
            //output += "var el = document.getElementById('"+this.id+"');\n";
            for(var event in this.events) {
                for(var i=0; i<this.events[event].length; i++) {
                    output += "document.addEventListener('" + event + "', ";
                    output += "function(e) {\n";

                    output += serialHelper.serialize(this.events[event][i], serialHelper);
                    //output += this.events[event][i].objectId;
                    output += ".execute(e)\n";
                    output += "}\n";
                    output += " );\n";
                }
            }
            output += "return document;\n";
            output += "}();\n";
            return output;
        },
        addEventListener: function(eventName, callback) {
            if(this.events[eventName]) {
               this.events[eventName].push(callback); 
            } else {
               this.events[eventName] = [callback]; 
            }
            return this;
        }
    };

    return StaticDocument;

});

